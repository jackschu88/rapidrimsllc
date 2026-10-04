import { createFileRoute, Link } from "@tanstack/react-router";
import { BeforeAfterStack } from "@/components/site/before-after";
import { FaqList } from "@/components/site/faq-list";
import { PhotoGuide } from "@/components/site/photo-guide";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import {
  CURB_RASH_FAQS,
  faqJsonLd,
  jsonLd,
  pageHead,
} from "@/lib/site";
import { BLACK_ALLOY_HONDA_JOB } from "@/lib/work";

export const Route = createFileRoute("/curb-rash-repair")({
  component: CurbRashRepair,
  head: () =>
    pageHead(
      "On-Car Rim Curb Rash & Scuff Repair | Las Vegas | RapidRims",
      "Cosmetic lip repair in your driveway. The wheel stays on. Text photos for a quote. Veteran-owned. Las Vegas Valley. Call or text (612) 219-5065.",
      "/curb-rash-repair",
    ),
});

function CurbRashRepair() {
  return (
    <PublicPage
      jsonLd={[jsonLd, faqJsonLd(CURB_RASH_FAQS)]}
      crumb={{ label: "Curb rash repair", path: "/curb-rash-repair" }}
    >
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Curb rash
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            On-car curb rash repair.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Scuffs and gouges on the lip from a curb. We repair that in the
            driveway. The wheel stays on the car. One tech. Photo quote.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Cosmetic lip work. Not a shop drop-off.
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-muted">
            <p>
              Most jobs are 1–2 spots on the lip, or a heavier stretch. We
              grind, sand, polish or paint on site. Often about 20 minutes a
              rim.
            </p>
            <p>
              This is cosmetic. Bent wheels or leaks: send a photo. Structural
              damage or a crack may need a shop or a replacement — that is not
              an on-car job.
            </p>
            <p>
              Veteran-owned. Las Vegas Valley. Text photos and we quote from
              what we see. Typical prices are on the{" "}
              <Link to="/pricing" className="text-fg hover:text-accent">
                pricing page
              </Link>
              . We come to you — see{" "}
              <Link
                to="/mobile-rim-repair-las-vegas"
                className="text-fg hover:text-accent"
              >
                mobile rim repair
              </Link>{" "}
              and the{" "}
              <Link to="/service-area" className="text-fg hover:text-accent">
                cities we cover
              </Link>
              . Painted Tesla wheels are on the{" "}
              <Link to="/tesla-wheel-repair" className="text-fg hover:text-accent">
                Tesla page
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 max-w-3xl">
            <BeforeAfterStack
              before={BLACK_ALLOY_HONDA_JOB.before}
              after={BLACK_ALLOY_HONDA_JOB.after}
              beforeAlt={BLACK_ALLOY_HONDA_JOB.beforeAlt}
              afterAlt={BLACK_ALLOY_HONDA_JOB.afterAlt}
            />
            <p className="mt-3 text-sm text-faint">
              {BLACK_ALLOY_HONDA_JOB.caption}
            </p>
          </div>
        </div>
      </section>

      <PhotoGuide />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Straight answers.
          </h2>
          <FaqList items={CURB_RASH_FAQS} />
        </div>
      </section>

      <QuoteCta />
    </PublicPage>
  );
}
