import { createFileRoute } from "@tanstack/react-router";
import { FaqList } from "@/components/site/faq-list";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import { ServiceCities } from "@/components/site/service-cities";
import {
  MOBILE_FAQS,
  faqJsonLd,
  jsonLd,
  pageHead,
} from "@/lib/site";

export const Route = createFileRoute("/mobile-rim-repair-las-vegas")({
  component: MobileRimRepair,
  head: () =>
    pageHead(
      "Mobile rim repair Las Vegas — we come to you | RapidRims",
      "One-tech mobile curb rash repair in the Las Vegas Valley. Driveway, work lot, or apartment. Wheel stays on. Text photos. Call or text (612) 219-5065.",
      "/mobile-rim-repair-las-vegas",
    ),
});

function MobileRimRepair() {
  return (
    <PublicPage jsonLd={[jsonLd, faqJsonLd(MOBILE_FAQS)]}>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Mobile
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            We come to you.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            One tech. Mobile only. On-car cosmetic lip repair in your driveway,
            work lot, or apartment. Las Vegas Valley. Veteran-owned.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Text. Quote. Driveway.
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-muted">
            <p>
              Shoot the damaged lip — close and from a step back. Text them to
              Jack. You get a number: light, heavier, or “that’s beyond
              on-car.”
            </p>
            <p>
              Then we come to you. The wheel stays on. Evenings and weekends.
              Same number for call or text.
            </p>
          </div>
          <ServiceCities />
          <p className="mt-6 text-sm text-faint">
            Southwest valley and surrounding. If you’re close, ask.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            How mobile works.
          </h2>
          <FaqList items={MOBILE_FAQS} />
        </div>
      </section>

      <QuoteCta heading="Text the photos. We’ll come to you." />
    </PublicPage>
  );
}
