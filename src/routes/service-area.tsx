import { createFileRoute, Link } from "@tanstack/react-router";
import { FaqList } from "@/components/site/faq-list";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import { ServiceCities } from "@/components/site/service-cities";
import {
  AREA_DETAILS,
  SERVICE_AREA_FAQS,
  faqJsonLd,
  jsonLd,
  pageHead,
} from "@/lib/site";

export const Route = createFileRoute("/service-area")({
  component: ServiceArea,
  head: () =>
    pageHead(
      "Rim Repair Henderson, North Las Vegas & Summerlin | RapidRims",
      "Mobile on-car curb rash repair in Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, and Enterprise. One tech. We come to you. Call or text (612) 219-5065.",
      "/service-area",
    ),
});

function ServiceArea() {
  return (
    <PublicPage
      jsonLd={[jsonLd, faqJsonLd(SERVICE_AREA_FAQS)]}
      crumb={{ label: "Service area", path: "/service-area" }}
    >
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Service area
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            Mobile rim repair in Las Vegas, Henderson, Summerlin &amp; North Las
            Vegas.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            On-car curb rash repair in Las Vegas, Henderson, North Las Vegas,
            Summerlin, Spring Valley, and Enterprise. Driveway, work lot, or
            apartment. Evenings and weekends. One number.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Cities we cover.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Same repair and the same{" "}
            <Link to="/pricing" className="text-fg hover:text-accent">
              prices
            </Link>{" "}
            in every city below. If you’re close and not on the list, ask.
          </p>
          <ServiceCities />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {AREA_DETAILS.map((area) => (
              <article
                key={area.slug}
                id={area.slug}
                className="scroll-mt-32 rounded-xl border border-border bg-bg p-6"
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {area.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {area.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Getting there.
          </h2>
          <FaqList items={SERVICE_AREA_FAQS} />
        </div>
      </section>

      <QuoteCta heading="In the valley? Text the photos." />
    </PublicPage>
  );
}
