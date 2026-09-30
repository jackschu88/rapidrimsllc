import { Link } from "@tanstack/react-router";
import { AREA_DETAILS } from "@/lib/site";

export function ServiceCities() {
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {AREA_DETAILS.map((area) => (
        <li key={area.slug}>
          <Link
            to="/service-area"
            hash={area.slug}
            className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm hover:border-accent/50 hover:text-accent"
          >
            {area.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
