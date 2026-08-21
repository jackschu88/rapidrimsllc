"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign in — RapidRims" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-fg">
      <div className="w-full max-w-sm space-y-5">
        <Link to="/" className="flex justify-center">
          <img
            src="/logo.jpg"
            alt="RapidRims LLC"
            className="h-12 w-auto"
          />
        </Link>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Sign in
        </h1>
        <p className="text-sm text-muted">
          For site admin only. Customers: call or text photos — no account
          needed.
        </p>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
        <Link to="/" className="block text-sm text-muted hover:text-fg">
          Back to RapidRims
        </Link>
      </div>
    </main>
  );
}
