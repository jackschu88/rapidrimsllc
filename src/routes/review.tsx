import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PublicPage } from "@/components/site/public-page";
import { Button } from "@/components/ui/button";
import { SITE, jsonLd, smsHref } from "@/lib/site";
import { getReviewConfig, logShareClick, submitReview } from "@/lib/reviews/functions";

export const Route = createFileRoute("/review")({
  validateSearch: (s: Record<string, unknown>) => ({ src: typeof s.src === "string" ? s.src.slice(0, 40) : undefined }),
  loader: () => getReviewConfig(),
  component: ReviewPage,
  head: () => ({
    meta: [
      { title: "How did we do? | RapidRims" },
      { name: "description", content: "Tell RapidRims how your wheel repair went and get $10 off your next repair." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

type Done = { reviewId: string; body: string; balanceCents: number };

function ReviewPage() {
  const config = Route.useLoaderData();
  const { src } = Route.useSearch();
  const [done, setDone] = useState<Done | null>(null);
  return (
    <PublicPage jsonLd={jsonLd}>
      <section className="border-b border-border">
        <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
          {done ? (
            <Thanks done={done} links={config.links} />
          ) : config.enabled ? (
            <ReviewForm source={src ?? "web"} onDone={setDone} />
          ) : (
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight">How did we do?</h1>
              <p className="mt-4 text-muted">
                Online feedback isn't open yet. Text us at{" "}
                <a href={smsHref()} className="text-fg underline">{SITE.phonePretty}</a> instead.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicPage>
  );
}

function ReviewForm({ source, onDone }: { source: string; onDone: (d: Done) => void }) {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const field = "mt-1 w-full rounded-md border border-border bg-bg px-3 py-3 text-base text-fg outline-none focus:border-accent";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      rating,
      body: String(fd.get("body") ?? ""),
      displayConsent: fd.get("displayConsent") === "on",
      website: String(fd.get("website") ?? ""),
      source,
    };
    setBusy(true);
    try {
      const res = await submitReview({ data });
      if (res.ok) onDone({ reviewId: res.reviewId, body: data.body.trim(), balanceCents: res.balanceCents });
      else setErrors(res.errors);
    } catch {
      setErrors({ form: "Something went wrong. Please try again, or text us." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="review-title">
      <h1 id="review-title" className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        How did we do?
      </h1>
      <p className="mt-3 text-muted">Tell us how your repair went and get $10 off your next repair. Good or bad, every answer gets the credit.</p>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium">Your rating</legend>
        <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Star className={`size-10 ${n <= rating ? "fill-accent text-accent" : "text-faint"}`} />
            </button>
          ))}
        </div>
        {errors.rating ? <p className="mt-1 text-sm text-red-400">{errors.rating}</p> : null}
      </fieldset>

      <label className="mt-6 block text-sm font-medium">
        One line about the job
        <input name="body" maxLength={280} required className={field} placeholder="e.g. Fixed my curb rash in 20 minutes in my driveway" />
        {errors.body ? <span className="mt-1 block text-sm text-red-400">{errors.body}</span> : null}
      </label>
      <label className="mt-4 block text-sm font-medium">
        Name
        <input name="name" autoComplete="name" required maxLength={80} className={field} />
        {errors.name ? <span className="mt-1 block text-sm text-red-400">{errors.name}</span> : null}
      </label>
      <label className="mt-4 block text-sm font-medium">
        Phone <span className="font-normal text-faint">(your $10 credit is saved to this number)</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} placeholder="(702) 555-0123" />
        {errors.phone ? <span className="mt-1 block text-sm text-red-400">{errors.phone}</span> : null}
      </label>
      <label className="mt-4 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="displayConsent" defaultChecked className="mt-1 size-4" />
        OK to show my first name, last initial and comment on rapidrimslv.com. We never show your phone number.
      </label>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {errors.form ? <p className="mt-4 text-sm text-red-400" role="alert">{errors.form}</p> : null}
      <Button type="submit" size="xl" className="mt-6 w-full" disabled={busy}>
        {busy ? "Sending…" : "Send feedback"}
      </Button>
      <p className="mt-3 text-xs text-faint">
        $10 promotional credit toward a future RapidRims service, no cash value. Credits stack and don't expire.
      </p>
    </form>
  );
}

function Thanks({ done, links }: { done: Done; links: { google: string | null; facebook: string } }) {
  const [copied, setCopied] = useState(false);
  function share(platform: "google" | "facebook", url: string) {
    // Clipboard write must happen synchronously inside the click (iOS Safari).
    try {
      void navigator.clipboard?.writeText(done.body).then(() => setCopied(true));
    } catch {
      /* clipboard unavailable: the customer can type it */
    }
    void logShareClick({ data: { reviewId: done.reviewId, platform } }).catch(() => undefined);
    window.open(url, "_blank", "noopener");
  }
  return (
    <div>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Thanks for the feedback.</h1>
      <div className="mt-5 rounded-lg border border-border bg-surface p-5">
        <p className="text-lg font-medium">Your $10 credit is saved to your phone number.</p>
        <p className="mt-1 text-sm text-muted">
          It comes off your next RapidRims service. Your balance: ${(done.balanceCents / 100).toFixed(0)}.
        </p>
      </div>
      <p className="mt-5 text-sm text-muted">
        Anything we should make right? Text Jack at{" "}
        <a href={smsHref()} className="text-fg underline">{SITE.phonePretty}</a>.
      </p>

      <section className="mt-12 border-t border-border pt-8" aria-labelledby="share-title">
        <h2 id="share-title" className="font-display text-2xl font-semibold">Want to post it publicly too?</h2>
        <p className="mt-2 text-sm text-muted">
          Totally optional. Tapping a button copies what you wrote so you can paste it there.
        </p>
        <div className="mt-5 flex flex-col gap-3" data-testid="share-buttons">
          {links.google ? (
            <Button type="button" variant="outline" size="lg" onClick={() => share("google", links.google!)}>
              Post on Google
            </Button>
          ) : null}
          <Button type="button" variant="outline" size="lg" onClick={() => share("facebook", links.facebook)}>
            Post on Facebook
          </Button>
        </div>
        {copied ? <p className="mt-3 text-sm text-muted" role="status">Copied. Paste it in and tap post.</p> : null}
      </section>
    </div>
  );
}
