import { AREAS } from "@/lib/site";

export function ServiceCities() {
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {AREAS.map((a) => (
        <li
          key={a}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm"
        >
          {a}
        </li>
      ))}
    </ul>
  );
}
