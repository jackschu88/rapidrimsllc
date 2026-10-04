import { createFileRoute, Link } from "@tanstack/react-router";
import { BeforeAfterStack } from "@/components/site/before-after";
import { PublicPage } from "@/components/site/public-page";
import { QuoteCta } from "@/components/site/quote-cta";
import { SITE, jsonLd, pageHead } from "@/lib/site";
import { WORK_JOBS } from "@/lib/work";

const TITLE = "Curb Rash Repair Before and After | Las Vegas | RapidRims";
const DESCRIPTION =
  "Real RapidRims jobs in Las Vegas: curb rash and rim scuff repair, before and after. Text photos of your wheel for a quote. Call or text (612) 219-5065.";

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "RapidRims curb rash repair before and after",
  url: `${SITE.canonicalOrigin}/work`,
  image: WORK_JOBS.flatMap((job) => [
    {
      "@type": "ImageObject",
      contentUrl: `${SITE.website}${job.before}`,
      description: job.beforeAlt,
    },
    {
      "@type": "ImageObject",
      contentUrl: `${SITE.website}${job.after}`,
      description: job.afterAlt,
    },
  ]),
};

export const Route = createFileRoute("/work")({
  component: Work,
  head: () => pageHead(TITLE, DESCRIPTION, "/work"),
});

function Work() {
  return (
    <PublicPage
      jsonLd={[jsonLd, galleryJsonLd]}
      crumb={{ label: "Work", path: "/work" }}
    >
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Work
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl">
            Curb rash repair before and after.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Real RapidRims jobs in Las Vegas. Before on the left, after on the
            right. Prices are on the{" "}
            <Link to="/pricing" className="text-fg hover:text-accent">
              pricing page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            {WORK_JOBS.map((job) => (
              <figure key={job.after} className="min-w-0">
                <BeforeAfterStack
                  before={job.before}
                  after={job.after}
                  beforeAlt={job.beforeAlt}
                  afterAlt={job.afterAlt}
                  position={job.position}
                />
                <figcaption className="mt-3 text-sm text-faint">
                  {job.caption}
                  {job.to ? (
                    <>
                      {" "}
                      <Link to={job.to} className="hover:text-accent">
                        {job.link}
                      </Link>
                    </>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </PublicPage>
  );
}
