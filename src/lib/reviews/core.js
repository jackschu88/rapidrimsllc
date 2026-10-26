// Reviews + credits core logic. Plain JS (with JSDoc) so `node --test` can run
// it against PGLite without a TS build. Every function takes the shared `Sql`
// surface from src/lib/db.ts (anything with `.query(text, params)`).
//
// Locked rules (do not change without Jack):
//  - a $10 credit is issued on submit of the on-site form, for ANY rating;
//  - credits stack, never expire, no per-job cap;
//  - public share clicks are analytics only: nothing here reads share_clicks
//    when issuing or redeeming credits;
//  - moderation may reject only for the neutral reasons below (never for a low
//    rating), and approved reviews are shown regardless of stars.

export const CREDIT_CENTS = 1000;
export const NEUTRAL_REJECT_REASONS = Object.freeze([
  "abusive",
  "personal_info",
  "off_topic",
  "suspected_fake",
  "no_consent",
]);
export const SHARE_PLATFORMS = Object.freeze(["google", "facebook"]);
export const FACEBOOK_REVIEWS_URL =
  "https://www.facebook.com/profile.php?id=61580044594010&sk=reviews";
export const RATE_LIMIT_PER_HOUR = 5;

/** US-only E.164 normaliser: "(702) 555-0123", "702.555.0123", "+1 702…" → "+17025550123". */
export function normalizePhone(input) {
  if (typeof input !== "string") return null;
  let d = input.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  d = d.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) return null;
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(d)) return null;
  return `+1${d}`;
}

/** "chava mercado" → "Chava M." (first name + last initial only). */
export function displayNameFrom(name) {
  const parts = String(name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "Customer";
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const first = cap(parts[0].slice(0, 30));
  return parts.length > 1 ? `${first} ${parts.at(-1).charAt(0).toUpperCase()}.` : first;
}

/** Validate a form submission. Returns { ok, errors, value }. */
export function validateSubmission(raw) {
  const errors = {};
  const name = String(raw?.name ?? "").trim();
  const phone = normalizePhone(String(raw?.phone ?? ""));
  const rating = Number(raw?.rating);
  const body = String(raw?.body ?? "").trim().replace(/\s+/g, " ");
  if (name.length < 1 || name.length > 80) errors.name = "Please enter your name.";
  if (!phone) errors.phone = "Please enter a 10-digit US phone number.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Pick 1 to 5 stars.";
  if (body.length < 1 || body.length > 280) errors.body = "One line, up to 280 characters.";
  const value = {
    name,
    phone,
    rating,
    body,
    displayConsent: raw?.displayConsent === true || raw?.displayConsent === "on",
    source: String(raw?.source ?? "web").slice(0, 40) || "web",
  };
  return { ok: Object.keys(errors).length === 0, errors, value };
}

/**
 * Store a review and issue a $10 credit (any rating), atomically in one
 * statement. Idempotent for an accidental double-submit (same phone + same
 * text within 10 minutes returns the first review instead of a second credit).
 */
export async function submitReview(sql, raw, { ipHash = null } = {}) {
  const v = validateSubmission(raw);
  if (!v.ok) return { ok: false, errors: v.errors };
  const { name, phone, rating, body, displayConsent, source } = v.value;
  if (ipHash) {
    const [{ n }] = await sql.query(
      "select count(*)::int as n from reviews where ip_hash = $1 and created_at > now() - interval '1 hour'",
      [ipHash],
    );
    if (n >= RATE_LIMIT_PER_HOUR) return { ok: false, errors: { form: "Too many submissions. Please try again later." } };
  }
  const dup = await sql.query(
    `select r.id from reviews r join customers c on c.id = r.customer_id
      where c.phone_e164 = $1 and r.body = $2 and r.created_at > now() - interval '10 minutes'
      order by r.created_at limit 1`,
    [phone, body],
  );
  if (dup.length) {
    const balance = await creditBalance(sql, phone);
    return { ok: true, reviewId: dup[0].id, creditCents: CREDIT_CENTS, balanceCents: balance.totalCents, duplicate: true };
  }
  const rows = await sql.query(
    `with c as (
       insert into customers (phone_e164, name) values ($1, $2)
       on conflict (phone_e164) do update set name = excluded.name
       returning id
     ), r as (
       insert into reviews (customer_id, rating, body, display_name, display_consent, source, ip_hash)
       select id, $3, $4, $5, $6, $7, $8 from c
       returning id, customer_id
     ), cr as (
       insert into credits (customer_id, review_id, amount_cents)
       select customer_id, id, $9 from r
       returning id
     )
     select r.id as review_id from r, cr`,
    [phone, name, rating, body, displayNameFrom(name), displayConsent, source, ipHash, CREDIT_CENTS],
  );
  const balance = await creditBalance(sql, phone);
  return { ok: true, reviewId: rows[0].review_id, creditCents: CREDIT_CENTS, balanceCents: balance.totalCents };
}

/** Approved + display-consented reviews for the public widget. No phones. */
export async function listPublicReviews(sql, limit = 12) {
  const lim = Math.min(Math.max(Number(limit) || 12, 1), 50);
  const reviews = await sql.query(
    `select id, display_name, rating, body, created_at
       from reviews where status = 'approved' and display_consent = true
      order by created_at desc limit $1`,
    [lim],
  );
  const [agg] = await sql.query(
    `select count(*)::int as count, coalesce(round(avg(rating)::numeric, 1), 0)::text as average
       from reviews where status = 'approved' and display_consent = true`,
  );
  return {
    reviews: reviews.map((r) => ({
      id: r.id,
      name: r.display_name,
      rating: Number(r.rating),
      body: r.body,
      date: new Date(r.created_at).toISOString(),
    })),
    count: agg.count,
    average: Number(agg.average),
  };
}

/** Moderation queue for the admin screen (includes phones; admin only). */
export async function listForModeration(sql, status = "pending") {
  return sql.query(
    `select r.id, r.rating, r.body, r.display_name, r.display_consent, r.status, r.reject_reason,
            r.source, r.created_at, c.phone_e164, c.name
       from reviews r join customers c on c.id = r.customer_id
      where ($1 = 'all' or r.status = $1)
      order by r.created_at desc limit 200`,
    [status],
  );
}

/**
 * Approve or reject. Rejection needs a neutral reason; there is deliberately no
 * "low rating" reason. Rejecting as suspected_fake voids that review's unused
 * credit (a fake submission shouldn't earn money); other rejections keep it.
 */
export async function moderateReview(sql, id, action, reason = null, by = null) {
  if (action === "approve") {
    const r = await sql.query(
      "update reviews set status = 'approved', reject_reason = null, moderated_at = now(), moderated_by = $2 where id = $1 returning id",
      [id, by],
    );
    return { ok: r.length === 1 };
  }
  if (action !== "reject") return { ok: false, error: "Unknown action" };
  if (!NEUTRAL_REJECT_REASONS.includes(reason)) {
    return { ok: false, error: `Rejection reason must be one of: ${NEUTRAL_REJECT_REASONS.join(", ")}` };
  }
  const r = await sql.query(
    "update reviews set status = 'rejected', reject_reason = $2, moderated_at = now(), moderated_by = $3 where id = $1 returning id",
    [id, reason, by],
  );
  if (r.length && reason === "suspected_fake") {
    await sql.query("update credits set status = 'void' where review_id = $1 and status = 'available'", [id]);
  }
  return { ok: r.length === 1 };
}

/** Admin-only hard delete (used to clean up test reviews). */
export async function deleteReview(sql, id) {
  await sql.query("delete from credits where review_id = $1 and status <> 'redeemed'", [id]);
  const r = await sql.query("delete from reviews where id = $1 returning customer_id", [id]);
  if (r.length) {
    // drop the customer too if nothing else references them
    await sql.query(
      `delete from customers c where c.id = $1
         and not exists (select 1 from reviews where customer_id = c.id)
         and not exists (select 1 from credits where customer_id = c.id)
         and not exists (select 1 from bookings where customer_id = c.id)`,
      [r[0].customer_id],
    );
  }
  return { ok: r.length === 1 };
}

/** Credit balance for a phone (admin lookup). */
export async function creditBalance(sql, phoneInput) {
  const phone = normalizePhone(String(phoneInput ?? ""));
  if (!phone) return { ok: false, error: "Invalid phone", totalCents: 0, credits: [] };
  const cust = await sql.query("select id, name, phone_e164 from customers where phone_e164 = $1", [phone]);
  if (!cust.length) return { ok: true, phone, customer: null, totalCents: 0, credits: [] };
  const credits = await sql.query(
    `select id, amount_cents, status, created_at, redeemed_at, redeemed_note
       from credits where customer_id = $1 order by created_at`,
    [cust[0].id],
  );
  const totalCents = credits.filter((c) => c.status === "available").reduce((s, c) => s + Number(c.amount_cents), 0);
  return { ok: true, phone, customer: cust[0], totalCents, credits };
}

/**
 * Redeem available credits for a phone (stacking): oldest first, up to
 * `maxCents` (default: all of them). Whole credits only.
 */
export async function redeemCredits(sql, phoneInput, { maxCents = Infinity, note = null, bookingId = null } = {}) {
  const bal = await creditBalance(sql, phoneInput);
  if (!bal.ok || !bal.customer) return { ok: false, error: bal.error ?? "No credits for this phone", redeemedCents: 0 };
  const ids = [];
  let total = 0;
  for (const c of bal.credits) {
    if (c.status !== "available") continue;
    if (total + Number(c.amount_cents) > maxCents) break;
    ids.push(c.id);
    total += Number(c.amount_cents);
  }
  if (!ids.length) return { ok: true, redeemedCents: 0 };
  const done = await sql.query(
    `update credits set status = 'redeemed', redeemed_at = now(), redeemed_note = $2, redeemed_booking_id = $3
      where id = any($1::uuid[]) and status = 'available' returning amount_cents`,
    [ids, note, bookingId],
  );
  return { ok: true, redeemedCents: done.reduce((s, c) => s + Number(c.amount_cents), 0) };
}

/**
 * Bookings hook: create a booking for a phone and auto-apply that customer's
 * available credits (all of them, capped at the subtotal).
 */
export async function applyCreditsToBooking(sql, { phone: phoneInput, name = null, subtotalCents, service = null, scheduledAt = null }) {
  const phone = normalizePhone(String(phoneInput ?? ""));
  if (!phone) return { ok: false, error: "Invalid phone" };
  const sub = Math.max(0, Math.round(Number(subtotalCents) || 0));
  const [cust] = await sql.query(
    `insert into customers (phone_e164, name) values ($1, $2)
     on conflict (phone_e164) do update set name = coalesce(excluded.name, customers.name) returning id`,
    [phone, name],
  );
  const [b] = await sql.query(
    "insert into bookings (customer_id, scheduled_at, service, subtotal_cents, total_cents) values ($1, $2, $3, $4, $4) returning id",
    [cust.id, scheduledAt, service, sub],
  );
  const { redeemedCents } = await redeemCredits(sql, phone, { maxCents: sub, note: "auto-applied to booking", bookingId: b.id });
  await sql.query("update bookings set discount_cents = $2, total_cents = $3 where id = $1", [b.id, redeemedCents, sub - redeemedCents]);
  return { ok: true, bookingId: b.id, discountCents: redeemedCents, totalCents: sub - redeemedCents };
}

/** Analytics only. Never consulted by any credit code path. */
export async function logShareClick(sql, reviewId, platform) {
  if (!SHARE_PLATFORMS.includes(platform)) return { ok: false };
  await sql.query("insert into share_clicks (review_id, platform) values ($1, $2)", [reviewId, platform]);
  return { ok: true };
}

/** Public share links. Google stays hidden until GOOGLE_PLACE_ID is set. */
export function shareLinks(env = {}) {
  const placeId = String(env.GOOGLE_PLACE_ID ?? "").trim();
  return {
    // TODO(Jack): set GOOGLE_PLACE_ID on Vercel once the Google Business
    // Profile is verified; the Google button appears automatically.
    google: placeId ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}` : null,
    facebook: String(env.FACEBOOK_REVIEWS_URL ?? "").trim() || FACEBOOK_REVIEWS_URL,
  };
}

/** Is this email allowed into /admin? (ADMIN_EMAILS, comma-separated) */
export function isAdminEmail(email, adminEmailsEnv) {
  const list = String(adminEmailsEnv ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return Boolean(email) && list.includes(String(email).toLowerCase());
}
