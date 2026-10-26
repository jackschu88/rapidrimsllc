// Acceptance tests for the review connector (node --test scripts).
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import * as core from "../src/lib/reviews/core.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function freshDb() {
  const pg = new PGlite();
  for (const f of (await readdir(join(root, "migrations"))).sort()) {
    await pg.exec(await readFile(join(root, "migrations", f), "utf8"));
  }
  return { query: async (t, p = []) => (await pg.query(t, p)).rows };
}
const sub = (o = {}) => ({ name: "Test Person", phone: "(702) 555-0123", rating: 5, body: "Great job", displayConsent: true, ...o });

test("1-star and 5-star submissions each earn a $10 credit", async () => {
  const sql = await freshDb();
  const a = await core.submitReview(sql, sub({ rating: 1, body: "Not happy", phone: "7025550101" }));
  const b = await core.submitReview(sql, sub({ rating: 5, body: "Loved it", phone: "7025550102" }));
  assert.equal(a.creditCents, 1000);
  assert.equal(b.creditCents, 1000);
  assert.equal((await core.creditBalance(sql, "7025550101")).totalCents, 1000);
  assert.equal((await core.creditBalance(sql, "7025550102")).totalCents, 1000);
});

test("credits stack with no cap and never expire", async () => {
  const sql = await freshDb();
  for (const body of ["one", "two", "three"]) await core.submitReview(sql, sub({ body }));
  const bal = await core.creditBalance(sql, "+17025550123");
  assert.equal(bal.totalCents, 3000);
  const cols = await sql.query("select column_name from information_schema.columns where table_name = 'credits'");
  assert.ok(!cols.some((c) => /expire/.test(c.column_name)), "no expiry column");
});

test("accidental double-submit gives one credit", async () => {
  const sql = await freshDb();
  await core.submitReview(sql, sub());
  const again = await core.submitReview(sql, sub());
  assert.equal(again.duplicate, true);
  assert.equal((await core.creditBalance(sql, "7025550123")).totalCents, 1000);
});

test("phone formats map to the same customer", async () => {
  const sql = await freshDb();
  assert.equal(core.normalizePhone("(702) 555-0123"), "+17025550123");
  assert.equal(core.normalizePhone("+1 702.555.0123"), "+17025550123");
  assert.equal(core.normalizePhone("555-0123"), null);
  await core.submitReview(sql, sub({ phone: "(702) 555-0123", body: "a" }));
  await core.submitReview(sql, sub({ phone: "+17025550123", body: "b" }));
  const [{ n }] = await sql.query("select count(*)::int as n from customers");
  assert.equal(n, 1);
});

test("bookings hook auto-applies all available credits once", async () => {
  const sql = await freshDb();
  await core.submitReview(sql, sub({ body: "a" }));
  await core.submitReview(sql, sub({ body: "b" }));
  const b1 = await core.applyCreditsToBooking(sql, { phone: "7025550123", subtotalCents: 15000 });
  assert.equal(b1.discountCents, 2000);
  assert.equal(b1.totalCents, 13000);
  const b2 = await core.applyCreditsToBooking(sql, { phone: "7025550123", subtotalCents: 15000 });
  assert.equal(b2.discountCents, 0);
});

test("admin redeem uses up the balance", async () => {
  const sql = await freshDb();
  await core.submitReview(sql, sub({ body: "a" }));
  const r = await core.redeemCredits(sql, "7025550123");
  assert.equal(r.redeemedCents, 1000);
  assert.equal((await core.creditBalance(sql, "7025550123")).totalCents, 0);
});

test("public list hides pending, rejected and no-consent reviews and never returns phones", async () => {
  const sql = await freshDb();
  const ok = await core.submitReview(sql, sub({ body: "approved one", phone: "7025550111", rating: 2 }));
  const pend = await core.submitReview(sql, sub({ body: "pending one", phone: "7025550112" }));
  const rej = await core.submitReview(sql, sub({ body: "rejected one", phone: "7025550113" }));
  const nc = await core.submitReview(sql, sub({ body: "no consent", phone: "7025550114", displayConsent: false }));
  await core.moderateReview(sql, ok.reviewId, "approve");
  await core.moderateReview(sql, rej.reviewId, "reject", "off_topic");
  await core.moderateReview(sql, nc.reviewId, "approve");
  const pub = await core.listPublicReviews(sql);
  assert.deepEqual(pub.reviews.map((r) => r.body), ["approved one"]);
  assert.equal(pub.reviews[0].rating, 2, "low ratings are shown when approved");
  assert.ok(!JSON.stringify(pub).includes("555"), "no phone numbers");
  assert.ok(pend.reviewId);
});

test("rejection only for neutral reasons; no low-rating reason exists", async () => {
  const sql = await freshDb();
  const r = await core.submitReview(sql, sub({ rating: 1 }));
  assert.equal((await core.moderateReview(sql, r.reviewId, "reject", "low_rating")).ok, false);
  assert.equal((await core.moderateReview(sql, r.reviewId, "reject")).ok, false);
  assert.ok(!core.NEUTRAL_REJECT_REASONS.some((x) => /rating|star|negative/.test(x)));
  await assert.rejects(sql.query("update reviews set reject_reason = 'low_rating' where id = $1", [r.reviewId]));
});

test("no credit code path reads share_clicks; credit unaffected by sharing", async () => {
  const src = await readFile(join(root, "src/lib/reviews/core.js"), "utf8");
  for (const fn of ["submitReview", "creditBalance", "redeemCredits", "applyCreditsToBooking"]) {
    const body = src.slice(src.indexOf(`export async function ${fn}`)).split("\nexport ")[0];
    assert.ok(!body.includes("share_clicks"), `${fn} must not read share_clicks`);
  }
  const sql = await freshDb();
  const r = await core.submitReview(sql, sub());
  await core.logShareClick(sql, r.reviewId, "facebook");
  assert.equal((await core.creditBalance(sql, "7025550123")).totalCents, 1000);
  assert.equal((await core.logShareClick(sql, r.reviewId, "yelp")).ok, false);
});

test("share links: Google hidden until GOOGLE_PLACE_ID is set; no Yelp anywhere", async () => {
  assert.equal(core.shareLinks({}).google, null);
  assert.equal(
    core.shareLinks({ GOOGLE_PLACE_ID: "ChIJabc" }).google,
    "https://search.google.com/local/writereview?placeid=ChIJabc",
  );
  assert.match(core.shareLinks({}).facebook, /61580044594010.*sk=reviews/);
  for (const f of ["src/routes/review.tsx", "src/lib/reviews/core.js", "src/components/site/testimonials.tsx"]) {
    assert.ok(!/yelp/i.test(await readFile(join(root, f), "utf8")), `${f} mentions Yelp`);
  }
});

test("thanks page: identical share buttons for every rating, credit never mentioned in the share section", async () => {
  const src = await readFile(join(root, "src/routes/review.tsx"), "utf8");
  const thanks = src.slice(src.indexOf("function Thanks"));
  const share = thanks.slice(thanks.indexOf('aria-labelledby="share-title"'));
  assert.ok(!/rating/.test(thanks), "Thanks must not branch on rating");
  assert.ok(!/\$10|credit/i.test(share), "no credit mention near the share buttons");
});

test("widget shows the feedback-credit disclosure", async () => {
  const src = await readFile(join(root, "src/components/site/testimonials.tsx"), "utf8");
  assert.match(src, /\$10 credit on their next service, whatever their rating/);
});

test("production refuses to run reviews on PGLite", async () => {
  const src = await readFile(join(root, "src/lib/reviews/functions.ts"), "utf8");
  assert.match(src, /dbSource === "pglite" && process\.env\.VERCEL_ENV === "production"/);
});

test("admin allowlist", () => {
  assert.equal(core.isAdminEmail("Jack@x.com", "jack@x.com, other@y.com"), true);
  assert.equal(core.isAdminEmail("eve@x.com", "jack@x.com"), false);
  assert.equal(core.isAdminEmail("jack@x.com", ""), false);
});

test("suspected-fake rejection voids that review's unused credit", async () => {
  const sql = await freshDb();
  const r = await core.submitReview(sql, sub());
  await core.moderateReview(sql, r.reviewId, "reject", "suspected_fake");
  assert.equal((await core.creditBalance(sql, "7025550123")).totalCents, 0);
});

test("delete removes a test review, its credit and orphan customer", async () => {
  const sql = await freshDb();
  const r = await core.submitReview(sql, sub());
  await core.deleteReview(sql, r.reviewId);
  const [{ n }] = await sql.query("select (select count(*) from reviews) + (select count(*) from credits) + (select count(*) from customers) as n");
  assert.equal(Number(n), 0);
});
