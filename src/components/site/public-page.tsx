import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";

export function PublicPage({
  children,
  jsonLd,
}: {
  children: ReactNode;
  jsonLd: unknown | unknown[];
}) {
  const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return (
    <div className="min-h-dvh bg-bg text-fg">
      {blocks.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
