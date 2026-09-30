import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare } from "lucide-react";
import { NAV, SITE, smsHref, telHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { MobileQuoteBar } from "@/components/site/mobile-quote-bar";

const linkClass =
  "shrink-0 transition-colors hover:text-fg [&.active]:text-fg";

export function SiteHeader() {
  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.jpg"
            alt="RapidRims LLC — Las Vegas mobile curb rash repair"
            className="h-9 w-auto"
          />
        </Link>
        <nav className="ml-6 hidden items-center gap-5 text-sm text-muted lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/tesla-wheel-repair"
            className={linkClass}
          >
            Tesla
          </Link>
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
      <nav
        aria-label="Pages"
        className="flex gap-3 overflow-x-auto px-4 py-2 text-sm text-muted [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {NAV.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={linkClass}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/tesla-wheel-repair" className={linkClass}>
          Tesla
        </Link>
      </nav>
    </header>
    <MobileQuoteBar />
    </>
  );
}
