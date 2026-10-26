import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

type PublicReview = { id: string; name: string; rating: number; body: string; date: string };
type Data = { reviews: PublicReview[]; count: number; average: number };

/** Latest approved on-site reviews. Refreshes every 60s while visible. */
export function Testimonials() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/reviews/public?limit=6")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => alive && d && setData(d))
        .catch(() => undefined);
    load();
    const id = window.setInterval(() => document.visibilityState === "visible" && load(), 60_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  if (!data || data.count === 0) return null;
  return (
    <section id="reviews" className="border-b border-border" aria-labelledby="reviews-title" data-testid="testimonials">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Reviews</p>
        <h2 id="reviews-title" className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          What customers say.
        </h2>
        <p className="mt-3 text-muted">
          {data.average.toFixed(1)} out of 5 from {data.count} on-site review{data.count === 1 ? "" : "s"}.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {data.reviews.map((r) => (
            <li key={r.id} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`size-4 ${n <= r.rating ? "fill-accent text-accent" : "text-faint"}`} aria-hidden />
                ))}
              </div>
              <blockquote className="mt-3 text-fg">“{r.body}”</blockquote>
              <p className="mt-3 text-sm text-faint">
                {r.name} · {new Date(r.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-faint" data-testid="credit-disclosure">
          Customers who share feedback get a $10 credit on their next service, whatever their rating. We post every
          approved review, high or low. <Link to="/review" search={{ src: undefined }} className="underline">Leave yours</Link>.
        </p>
      </div>
    </section>
  );
}
