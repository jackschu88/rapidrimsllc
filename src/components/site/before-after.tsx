import { cn } from "@/lib/utils";

type PairProps = {
  before: string;
  after: string;
  alt?: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Tailwind object-position class, e.g. "object-top". */
  position?: string;
  className?: string;
};

export function BeforeAfterStack({
  before,
  after,
  alt = "curb rash repair Las Vegas",
  beforeAlt,
  afterAlt,
  position,
  className,
}: PairProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <figure className="relative overflow-hidden rounded-lg bg-surface-2">
        <img
          src={before}
          alt={beforeAlt ?? `${alt}, before`}
          className={cn("aspect-[4/3] h-full w-full object-cover", position)}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="absolute top-3 left-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
          Before
        </figcaption>
      </figure>
      <figure className="relative overflow-hidden rounded-lg bg-surface-2">
        <img
          src={after}
          alt={afterAlt ?? `${alt}, after`}
          className={cn("aspect-[4/3] h-full w-full object-cover", position)}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="absolute top-3 right-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
          After
        </figcaption>
      </figure>
    </div>
  );
}
