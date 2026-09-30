import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd } from "@/lib/site";

export function PublicPage({
  children,
  jsonLd,
  crumb,
}: {
  children: ReactNode;
  jsonLd: unknown | unknown[];
  crumb?: { label: string; path: string };
}) {
  const blocks = [
    ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
    ...(crumb ? [breadcrumbJsonLd(crumb.label, crumb.path)] : []),
  ];
  return (
    <div className="min-h-dvh bg-bg text-fg">
      {blocks.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <SiteHeader />
      {crumb ? (
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-6xl px-4 pt-4 text-sm text-faint sm:px-6"
        >
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          <span className="px-2" aria-hidden>
            /
          </span>
          <span className="text-muted">{crumb.label}</span>
        </nav>
      ) : null}
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
