import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-page";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "RapidRims — Las Vegas mobile curb rash repair" },
      {
        name: "description",
        content:
          "On-car curb rash repair in your driveway. Las Vegas, Henderson, Summerlin. Wheel stays on. About 20 minutes a rim. Call or text (612) 219-5065.",
      },
    ],
  }),
});

function Home() {
  return <HomePage />;
}
