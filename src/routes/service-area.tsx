import { createFileRoute } from "@tanstack/react-router";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import { ServiceCities } from "@/components/site/service-cities";
import { jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/service-area")({
  component: ServiceArea,
  head: () =>
    pageHead(
      "Service area — Las Vegas Valley mobile rim repair | RapidRims",
      "Mobile on-car curb rash repair in Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, and Enterprise. We come to you. Call or text (612) 219-5065.",
      "/service-area",
    ),
});

function ServiceArea() {
  return (
    <PublicPage jsonLd={jsonLd}>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Service area
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            Las Vegas Valley.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Mobile on-car curb rash repair. We come to your driveway, work lot,
            or apartment. Evenings and weekends. Text anytime — I answer fast.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Cities we cover.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            One page. No separate city sites. If you are in the valley, this is
            the list.
          </p>
          <ServiceCities />
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, and
            Enterprise. Southwest valley and surrounding. If you’re close, ask.
          </p>
        </div>
      </section>

      <QuoteCta heading="In the valley? Text the photos." />
    </PublicPage>
  );
}
