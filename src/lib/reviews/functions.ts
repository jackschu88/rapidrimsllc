import { createMiddleware, createServerFn } from "@tanstack/react-start";
import * as core from "./core.js";

/** Reviews must never run on the in-memory PGLite fallback in production. */
async function db() {
  const { getSql, dbSource } = await import("@/lib/db");
  if (dbSource === "pglite" && process.env.VERCEL_ENV === "production") {
    throw new Error("Reviews are not configured: DATABASE_URL is not set in production.");
  }
  return getSql();
}

function reviewsEnabled(): boolean {
  const hasDb = Boolean(process.env.DATABASE_URL?.trim());
  return hasDb || process.env.VERCEL_ENV !== "production";
}

/** Admin gate: signed in (better-auth) AND email listed in ADMIN_EMAILS. */
const adminMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { getBearerToken } = await import("@/lib/auth/client");
    return next({ sendContext: { bearerToken: getBearerToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    const { assertSameSiteRequest } = await import("@/lib/auth/isolation.server");
    const { getSessionUser, UnauthorizedError } = await import("@/lib/auth/verify.server");
    assertSameSiteRequest();
    const user = await getSessionUser((context as { bearerToken?: string }).bearerToken);
    if (!user) throw new UnauthorizedError();
    if (!core.isAdminEmail(user.email, process.env.ADMIN_EMAILS)) throw new Error("Forbidden");
    return next({ context: { adminEmail: user.email as string } });
  });

export const getReviewConfig = createServerFn({ method: "GET" }).handler(async () => {
  return { enabled: reviewsEnabled(), links: core.shareLinks(process.env) };
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as Record<string, unknown>)
  .handler(async ({ data }) => {
    const { assertSameSiteRequest } = await import("@/lib/auth/isolation.server");
    assertSameSiteRequest();
    if (data?.website) return { ok: false as const, errors: { form: "Something went wrong." } }; // honeypot
    if (!reviewsEnabled()) return { ok: false as const, errors: { form: "Reviews are not open yet. Please text us instead." } };
    const { getRequestIP } = await import("@tanstack/react-start/server");
    const { createHash } = await import("node:crypto");
    const ip = getRequestIP({ xForwardedFor: true }) ?? "";
    const ipHash = ip ? createHash("sha256").update(`rr:${ip}`).digest("hex").slice(0, 32) : null;
    const sql = await db();
    const res = await core.submitReview(sql, data, { ipHash });
    return res.ok
      ? { ok: true as const, reviewId: res.reviewId as string, creditCents: res.creditCents as number, balanceCents: res.balanceCents as number }
      : { ok: false as const, errors: res.errors as Record<string, string> };
  });

export const logShareClick = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { reviewId: string; platform: string })
  .handler(async ({ data }) => {
    if (!reviewsEnabled()) return { ok: false };
    const sql = await db();
    try {
      return await core.logShareClick(sql, data.reviewId, data.platform);
    } catch {
      return { ok: false };
    }
  });

export const adminListReviews = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((d: unknown) => d as { status: string })
  .handler(async ({ data }) => {
    const sql = await db();
    const rows = await core.listForModeration(sql, data.status || "pending");
    return rows.map((r: Record<string, unknown>) => ({ ...r, created_at: String(r.created_at) })) as Array<{
      id: string; rating: number; body: string; display_name: string; display_consent: boolean;
      status: string; reject_reason: string | null; source: string | null; created_at: string;
      phone_e164: string; name: string | null;
    }>;
  });

export const adminModerate = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((d: unknown) => d as { id: string; action: "approve" | "reject" | "delete"; reason?: string })
  .handler(async ({ data, context }) => {
    const sql = await db();
    if (data.action === "delete") return core.deleteReview(sql, data.id);
    return core.moderateReview(sql, data.id, data.action, data.reason ?? null, context.adminEmail);
  });

export const adminCredits = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((d: unknown) => d as { phone: string; redeem?: boolean; maxCents?: number; note?: string })
  .handler(async ({ data }) => {
    const sql = await db();
    let redeemedCents = 0;
    if (data.redeem) {
      const r = await core.redeemCredits(sql, data.phone, {
        maxCents: data.maxCents && data.maxCents > 0 ? data.maxCents : Infinity,
        note: data.note || "redeemed in admin",
      });
      redeemedCents = r.redeemedCents ?? 0;
    }
    const bal = await core.creditBalance(sql, data.phone);
    return {
      ok: bal.ok,
      error: bal.error ?? null,
      phone: bal.phone ?? null,
      name: (bal.customer?.name as string | undefined) ?? null,
      totalCents: bal.totalCents,
      redeemedCents,
      credits: (bal.credits as Array<Record<string, unknown>>).map((c) => ({
        id: String(c.id), amount_cents: Number(c.amount_cents), status: String(c.status),
        created_at: String(c.created_at), redeemed_note: (c.redeemed_note as string | null) ?? null,
      })),
    };
  });
