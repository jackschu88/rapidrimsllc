import type { FaqItem } from "@/lib/site";

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <dl className="mt-10 space-y-4">
      {items.map((item) => (
        <div
          key={item.q}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <dt className="font-display text-2xl font-semibold tracking-tight">
            {item.q}
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
