import { createFileRoute } from "@tanstack/react-router";
import { BeforeAfterStack } from "@/components/site/before-after";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import { jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/tesla-wheel-repair")({
  component: TeslaWheelRepair,
  head: () =>
    pageHead(
      "Tesla wheel repair Las Vegas — on-car curb rash | RapidRims",
      "On-car Tesla curb rash repair in Las Vegas. Real job photos. Wheel stays on. Text photos for a quote. Call or text (612) 219-5065.",
      "/tesla-wheel-repair",
    ),
});

function TeslaWheelRepair() {
  return (
    <PublicPage jsonLd={jsonLd}>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Tesla
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            Tesla curb rash, on the car.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Same mobile lip repair as every other job. This page exists because
            we have real Tesla photos from a Las Vegas driveway — not a brand
            farm.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Real job. Wheel stayed on.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Cosmetic lip repair. Quote from photos. If it is beyond on-car, we
            say so.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <figure className="min-w-0 md:col-span-2">
              <BeforeAfterStack
                before="/work/tesla-before.jpg"
                after="/work/tesla-after.jpg"
                alt="Tesla curb rash repair Las Vegas"
              />
              <figcaption className="mt-3 text-sm text-faint">
                Tesla, Las Vegas. On-car.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/work/tesla-before-full.jpg"
                alt="Tesla wheel before curb rash repair, Las Vegas"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <figcaption className="mt-3 text-sm text-faint">Before</figcaption>
            </figure>
            <figure>
              <img
                src="/work/tesla-after-full.jpg"
                alt="Tesla wheel after curb rash repair, Las Vegas"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <figcaption className="mt-3 text-sm text-faint">After</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <QuoteCta heading="Tesla rash? Text the photos." />
    </PublicPage>
  );
}
