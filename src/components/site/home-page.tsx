import {
  Clock,
  Instagram,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider, BeforeAfterStack } from "@/components/site/before-after";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import {
  AREAS,
  PRICING,
  SITE,
  jsonLd,
  smsHref,
  telHref,
} from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Text photos",
    body: "Shoot the damaged lip — close and from a step back. Text them to Jack.",
  },
  {
    n: "02",
    title: "We quote",
    body: "You get a number. Light, heavier, or “that’s beyond on-car.” No runaround.",
  },
  {
    n: "03",
    title: "We come to you",
    body: "Driveway, work lot, apartment. Wheel stays on. Often about 20 minutes a rim.",
  },
];

const gallery = [
  {
    before: "/work/black-before.jpg",
    after: "/work/black-after.jpg",
    caption: "Gloss black lip, on-car",
  },
  {
    before: "/work/suv-before.jpg",
    after: "/work/suv-after.jpg",
    caption: "Matte gray SUV, on-car",
  },
  {
    before: "/work/silver-before.jpg",
    after: "/work/silver-after.jpg",
    caption: "Silver five-spoke, light rash",
  },
  {
    before: "/work/turbine-before.jpg",
    after: "/work/turbine-after.jpg",
    caption: "Charcoal turbine, on-car",
  },
];

export function HomePage() {
  return (
    <div id="top" className="min-h-dvh bg-bg text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <How />
        <Pricing />
        <Honesty />
        <Gallery />
        <Area />
        <About />
        <Paint />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Las Vegas mobile rim repair
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.92] font-semibold tracking-tight text-fg sm:text-6xl lg:text-[4.4rem]">
            Curb rash fixed in your driveway.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Wheel stays on the car. No shop drop-off. Often about 20 minutes a
            rim — a typical set of four is about an hour.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary" size="xl" className="sm:min-w-56">
              <a href={telHref()}>
                <Phone className="size-5" />
                Call {SITE.phonePretty}
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="sm:min-w-56">
              <a href={smsHref()}>
                <MessageSquare className="size-5" />
                Text photos
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-faint">
            Same number for call or text. Evenings and weekends.
          </p>
        </div>
        <div className="relative">
          <figure className="relative overflow-hidden rounded-xl bg-surface-2">
            <img
              src="/work/tesla-after.jpg"
              alt="curb rash repair Las Vegas, after"
              className="aspect-square w-full object-cover"
              fetchPriority="high"
            />
            <figcaption className="absolute top-3 right-3 rounded-sm bg-bg/80 px-2 py-1 text-xs font-medium tracking-wider text-fg uppercase">
              After
            </figcaption>
            <figure className="absolute bottom-3 left-3 w-[44%] max-w-56 overflow-hidden rounded-md border border-fg/25 shadow-lg">
              <img
                src="/work/tesla-before.jpg"
                alt="curb rash repair Las Vegas, before"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="absolute top-2 left-2 rounded-sm bg-bg/80 px-2 py-0.5 text-[11px] font-medium tracking-wider text-fg uppercase">
                Before
              </figcaption>
            </figure>
          </figure>
          <p className="mt-3 text-center text-xs tracking-wide text-faint">
            Real job. Tesla, Las Vegas. Wheel stayed on the car.
          </p>
        </div>
      </div>
    </section>
  );
}

function How() {
  return (
    <section id="how" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          How it works
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Text. Quote. Driveway.
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <p className="font-display text-3xl font-semibold text-accent">
                {s.n}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Pricing
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Clear numbers. No “call for everything.”
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Quote is from photos. These are the typical on-car prices.
        </p>
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
      </div>
    </section>
  );
}

function Honesty() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-10">
          <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
            What to expect
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            This is driveway work. Not a booth.
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-muted">
            <p>
              The tire and wheel stay mounted. We color-match as close as
              on-car repair allows. Up close you might see a slight blend,
              texture, or a small nib. That’s because we don’t pull the wheel
              or bake it in a paint booth.
            </p>
            <p>
              That’s also why it’s quicker and cheaper than a shop. Most people
              see about 90–95% of a replacement — without replacement money.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-fg sm:grid-cols-3">
            <li className="flex items-start gap-2 rounded-md bg-bg px-4 py-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
              Honest if it’s beyond on-car
            </li>
            <li className="flex items-start gap-2 rounded-md bg-bg px-4 py-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
              About 20 minutes a rim
            </li>
            <li className="flex items-start gap-2 rounded-md bg-bg px-4 py-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              We come to you
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="work" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Work
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Drag to compare.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          On-car curb rash. Wheel never left the car.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <figure className="min-w-0 md:col-span-2">
            <BeforeAfterStack
              before="/work/tesla-before.jpg"
              after="/work/tesla-after.jpg"
              alt="curb rash repair Las Vegas"
            />
            <figcaption className="mt-3 text-sm text-faint">
              Real job. Tesla, Las Vegas.
            </figcaption>
          </figure>
          {gallery.map((g) => (
            <figure key={g.before} className="min-w-0">
              <BeforeAfterSlider
                before={g.before}
                after={g.after}
                alt="curb rash repair Las Vegas"
              />
              <figcaption className="mt-3 text-sm text-faint">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <figure>
            <img
              src="/work/process-sand.jpg"
              alt="curb rash repair Las Vegas"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 text-sm text-faint">
              Sanded on the car, in the driveway.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/work/process-paint.jpg"
              alt="curb rash repair Las Vegas"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 text-sm text-faint">
              Color-matched on site. Not a booth refinish.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Area() {
  return (
    <section id="area" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Service area
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Las Vegas and nearby.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Evenings and weekends. Text anytime — I answer fast.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <li
              key={a}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm"
            >
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-faint">
          Southwest valley and surrounding. If you’re close, ask.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          About
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          One tech. Mobile only.
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-muted">
          <p>
            RapidRims LLC is veteran-owned. Jack comes to your driveway,
            apartment lot, or workplace.
          </p>
          <p>
            This is on-car cosmetic rim repair. Fast. Local. No shop, no
            drop-off, no wait in a lobby.
          </p>
        </div>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm hover:text-accent"
        >
          <Instagram className="size-4" />
          More work on Instagram @{SITE.instagram}
        </a>
      </div>
    </section>
  );
}

function Paint() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-faint uppercase">
            Already on site
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Small paint scuffs
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Bumper nick, mirror, door edge — if I’m already there for rims, I
            can often hit a small paint touch-up. Same number. Not a body shop.
            Text a photo.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          Got rash? Text the photos.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          I’ll tell you what it is, what it isn’t, and when I can be there.
        </p>
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="primary" size="xl" className="sm:min-w-52">
            <a href={telHref()}>
              <Phone className="size-5" />
              Call
            </a>
          </Button>
          <Button asChild variant="outline" size="xl" className="sm:min-w-52">
            <a href={smsHref()}>
              <MessageSquare className="size-5" />
              Text photos
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
