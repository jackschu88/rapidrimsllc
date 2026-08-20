import { Instagram, Mail, Phone } from "lucide-react";
import { SITE, mailHref, smsHref, telHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[0.04em]">
            RAPID<span className="text-accent">RIMS</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Veteran-owned. Mobile on-car curb rash repair. Las Vegas and nearby.
            We come to you.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-faint uppercase">
            Reach Jack
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <Phone className="size-4" />
                {SITE.phonePretty}
              </a>
            </li>
            <li>
              <a
                href={smsHref()}
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                Text photos for a quote
              </a>
            </li>
            <li>
              <a
                href={mailHref()}
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <Mail className="size-4" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <Instagram className="size-4" />
                @{SITE.instagram}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-faint uppercase">
            Pay
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Cash is preferred. Card or other can be arranged if you need it. No
            online checkout — just text and we set a time.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {SITE.legalName}. Mobile only.</p>
          <p>Not a body shop. On-car cosmetic rim repair.</p>
        </div>
      </div>
    </footer>
  );
}
