import { Phone, MessageSquare } from "lucide-react";
import { SITE, smsHref, telHref } from "@/lib/site";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#work", label: "Work" },
  { href: "#area", label: "Area" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <a
          href="#top"
          className="font-display text-[1.35rem] font-semibold tracking-[0.04em] text-fg sm:text-[1.5rem]"
        >
          RAPID<span className="text-accent">RIMS</span>
        </a>
        <nav className="ml-6 hidden items-center gap-5 text-sm text-muted lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="sm:h-11 sm:px-4">
            <a href={smsHref()} aria-label={`Text photos to ${SITE.phonePretty}`}>
              <MessageSquare className="size-4" />
              <span className="sm:hidden">Text</span>
              <span className="hidden sm:inline">Text photos</span>
            </a>
          </Button>
          <Button asChild variant="primary" size="sm" className="sm:h-11 sm:px-4">
            <a href={telHref()} aria-label={`Call ${SITE.phonePretty}`}>
              <Phone className="size-4" />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">{SITE.phonePretty}</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
