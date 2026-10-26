import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { adminCredits, adminListReviews, adminModerate } from "@/lib/reviews/functions";
import { NEUTRAL_REJECT_REASONS } from "@/lib/reviews/core.js";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin | RapidRims" }, { name: "robots", content: "noindex, nofollow" }] }),
});

const REASON_LABEL: Record<string, string> = {
  abusive: "Abusive or obscene",
  personal_info: "Contains personal info",
  off_topic: "Off-topic / not about a job",
  suspected_fake: "Suspected fake (voids its credit)",
  no_consent: "No consent to display",
};

function Admin() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  return (
    <main className="mx-auto min-h-dvh max-w-5xl bg-bg px-4 py-8 text-fg sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">RapidRims admin</h1>
        <Link to="/" className="text-sm text-muted hover:text-fg">Site</Link>
      </div>
      <CreditLookup />
      <Moderation />
    </main>
  );
}

function errText(e: unknown) {
  const m = e instanceof Error ? e.message : String(e);
  if (m === "Forbidden") return "This account isn't on the admin list (ADMIN_EMAILS).";
  if (m === "Unauthorized") return "Please sign in.";
  return m;
}

function CreditLookup() {
  const [phone, setPhone] = useState("");
  const [res, setRes] = useState<Awaited<ReturnType<typeof adminCredits>> | null>(null);
  const [err, setErr] = useState("");
  const run = async (redeem: boolean) => {
    setErr("");
    try {
      setRes(await adminCredits({ data: { phone, redeem } }));
    } catch (e) {
      setErr(errText(e));
    }
  };
  return (
    <section className="mt-8 rounded-lg border border-border bg-surface p-5" aria-labelledby="credits-title">
      <h2 id="credits-title" className="text-xl font-semibold">Customer credits</h2>
      <p className="mt-1 text-sm text-muted">No booking system yet: look up a phone when quoting, then redeem.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(702) 555-0123"
          aria-label="Customer phone"
          className="min-w-56 flex-1 rounded-md border border-border bg-bg px-3 py-2"
        />
        <Button type="button" onClick={() => run(false)}>Look up</Button>
        <Button
          type="button"
          variant="outline"
          disabled={!res || res.totalCents === 0}
          onClick={() => confirm(`Redeem all $${((res?.totalCents ?? 0) / 100).toFixed(0)} for ${res?.phone}?`) && run(true)}
        >
          Redeem all
        </Button>
      </div>
      {err ? <p className="mt-3 text-sm text-red-400">{err}</p> : null}
      {res ? (
        <div className="mt-4 text-sm" data-testid="credit-result">
          {res.error ? (
            <p className="text-red-400">{res.error}</p>
          ) : (
            <>
              <p className="text-lg">
                {res.phone} {res.name ? `· ${res.name}` : ""}: <strong>${(res.totalCents / 100).toFixed(0)} available</strong>
              </p>
              {res.redeemedCents ? <p className="text-accent">Redeemed ${(res.redeemedCents / 100).toFixed(0)}.</p> : null}
              <ul className="mt-2 space-y-1 text-muted">
                {res.credits.map((c) => (
                  <li key={c.id}>
                    ${(c.amount_cents / 100).toFixed(0)} · {c.status} · {new Date(c.created_at).toLocaleDateString()}
                    {c.redeemed_note ? ` · ${c.redeemed_note}` : ""}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}

function Moderation() {
  const [status, setStatus] = useState("pending");
  const [rows, setRows] = useState<Awaited<ReturnType<typeof adminListReviews>>>([]);
  const [err, setErr] = useState("");
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const load = useCallback(async () => {
    setErr("");
    try {
      setRows(await adminListReviews({ data: { status } }));
    } catch (e) {
      setErr(errText(e));
    }
  }, [status]);
  useEffect(() => {
    void load();
  }, [load]);
  const act = async (id: string, action: "approve" | "reject" | "delete") => {
    if (action === "delete" && !confirm("Delete this review permanently (and its unused credit)?")) return;
    try {
      const r = await adminModerate({ data: { id, action, reason: reasons[id] } });
      if (!r.ok) setErr("error" in r && r.error ? String(r.error) : "Failed");
      await load();
    } catch (e) {
      setErr(errText(e));
    }
  };
  return (
    <section className="mt-8" aria-labelledby="mod-title">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="mod-title" className="text-xl font-semibold">Reviews</h2>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter" className="rounded-md border border-border bg-bg px-2 py-1">
          {["pending", "approved", "rejected", "all"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <p className="mt-1 text-sm text-muted">
        Approve every genuine review, including low ratings. Reject only for the neutral reasons listed.
      </p>
      {err ? <p className="mt-3 text-sm text-red-400">{err}</p> : null}
      <ul className="mt-4 space-y-3">
        {rows.length === 0 ? <li className="text-sm text-muted">Nothing here.</li> : null}
        {rows.map((r) => (
          <li key={r.id} className="rounded-lg border border-border bg-surface p-4" data-testid="mod-row">
            <p className="text-sm text-faint">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} · {r.display_name} ({r.name}, {r.phone_e164}) ·{" "}
              {new Date(r.created_at).toLocaleString()} · {r.source} · {r.display_consent ? "OK to show" : "no display consent"} ·{" "}
              <strong>{r.status}</strong>{r.reject_reason ? ` (${r.reject_reason})` : ""}
            </p>
            <p className="mt-2">{r.body}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" onClick={() => act(r.id, "approve")}>Approve</Button>
              <select
                aria-label="Rejection reason"
                value={reasons[r.id] ?? ""}
                onChange={(e) => setReasons({ ...reasons, [r.id]: e.target.value })}
                className="rounded-md border border-border bg-bg px-2 py-1 text-sm"
              >
                <option value="">Reject reason…</option>
                {NEUTRAL_REJECT_REASONS.map((x) => <option key={x} value={x}>{REASON_LABEL[x]}</option>)}
              </select>
              <Button type="button" size="sm" variant="outline" disabled={!reasons[r.id]} onClick={() => act(r.id, "reject")}>Reject</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => act(r.id, "delete")}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
