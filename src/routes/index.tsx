import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "robots", content: "index, follow" },
    ],
  }),
});

function Home() {
  return <HomePage />;
}
