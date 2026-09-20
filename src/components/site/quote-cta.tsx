import { MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, smsHref, telHref } from "@/lib/site";

type QuoteCtaProps = {
  heading?: string;
  body?: string;
};

export function QuoteCta({
  heading = "Got rash? Text the photos.",
  body = "I’ll tell you what it is, what it isn’t, and when I can be there.",
}: QuoteCtaProps) {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">{body}</p>
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="primary" size="xl" className="sm:min-w-52">
            <a href={telHref()}>
              <Phone className="size-5" />
              Call {SITE.phonePretty}
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
