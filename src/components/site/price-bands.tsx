import { PRICING } from "@/lib/site";

export function PriceBands() {
  return (
    <>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PRICING.map((p) => (
          <article
            key={p.name}
            className={
              p.featured
                ? "rounded-xl border border-accent/50 bg-bg p-6"
                : "rounded-xl border border-border bg-bg p-6"
            }
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              {p.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{p.detail}</p>
            <p className="mt-6 font-display text-4xl font-semibold tracking-tight text-fg">
              {p.price}
            </p>
            <p className="mt-1 text-sm text-faint">{p.unit}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Military / veteran: 10% off with ID. That sits on top of the prices
        above — we don’t advertise $80 rims.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Severe damage that needs the wheel pulled, or that we won’t stand
        behind as driveway work: we won’t quote it as an on-car job. We’ll
        tell you honestly if it’s beyond this.
      </p>
      <p className="mt-6 text-sm text-faint">
        Cash preferred. Card can be arranged if needed.
      </p>
    </>
  );
}
