import { createFileRoute } from "@tanstack/react-router";
import { FaqList } from "@/components/site/faq-list";
import { PriceBands } from "@/components/site/price-bands";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import {
  PRICING_FAQS,
  faqJsonLd,
  jsonLd,
  pageHead,
} from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () =>
    pageHead(
      "Curb rash repair pricing — Las Vegas | RapidRims",
      "Light 1–2 lip spots $100/rim. Heavier on-car $125–$150/rim. Two or more same visit $90–$100 each. Veteran 10% with ID. Quote from photos. Call or text (612) 219-5065.",
      "/pricing",
    ),
});

function PricingPage() {
  return (
    <PublicPage jsonLd={[jsonLd, faqJsonLd(PRICING_FAQS)]}>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Pricing
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            Clear numbers.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Quote is from photos. These are the typical on-car prices. Some jobs
            are beyond on-car — we will say that.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Typical on-car prices.
          </h2>
          <PriceBands />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What the numbers mean.
          </h2>
          <FaqList items={PRICING_FAQS} />
        </div>
      </section>

      <QuoteCta heading="Photos first. Then a number." />
    </PublicPage>
  );
}
