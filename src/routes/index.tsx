import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-page";
import { SITE, pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => pageHead(SITE.title, SITE.description, "/"),
});

function Home() {
  return <HomePage />;
}
