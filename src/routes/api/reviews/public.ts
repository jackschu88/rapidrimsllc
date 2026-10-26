import { createFileRoute } from "@tanstack/react-router";
import { listPublicReviews } from "@/lib/reviews/core.js";

export const Route = createFileRoute("/api/reviews/public")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const empty = { reviews: [], count: 0, average: 0 };
        const headers = {
          "content-type": "application/json",
          "cache-control": "public, s-maxage=60, stale-while-revalidate=600",
        };
        const hasDb = Boolean(process.env.DATABASE_URL?.trim());
        if (!hasDb && process.env.VERCEL_ENV === "production") {
          return new Response(JSON.stringify(empty), { headers });
        }
        try {
          const { getSql } = await import("@/lib/db");
          const limit = Number(new URL(request.url).searchParams.get("limit") ?? 12);
          const data = await listPublicReviews(await getSql(), limit);
          return new Response(JSON.stringify(data), { headers });
        } catch (err) {
          console.error("[reviews] public list failed", err);
          return new Response(JSON.stringify(empty), { headers: { ...headers, "cache-control": "no-store" } });
        }
      },
    },
  },
});
