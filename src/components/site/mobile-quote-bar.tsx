import { MessageSquare, Phone } from "lucide-react";
import { SITE, smsHref, telHref } from "@/lib/site";

export function MobileQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={telHref()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent text-sm font-medium text-accent-fg"
        >
          <Phone className="size-4" />
          {SITE.phonePretty}
        </a>
        <a
          href={smsHref()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-steel/35 text-sm font-medium"
        >
          <MessageSquare className="size-4" />
          Text photos
        </a>
      </div>
    </div>
  );
}
