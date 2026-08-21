import { cn } from "@/lib/utils";

type PairProps = {
  before: string;
  after: string;
  alt?: string;
  className?: string;
};

export function BeforeAfterStack({
  before,
  after,
  alt = "curb rash repair Las Vegas",
  className,
}: PairProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <figure className="relative overflow-hidden rounded-lg bg-surface-2">
        <img
          src={before}
          alt={`${alt}, before`}
          className="aspect-[4/3] h-full w-full object-cover"
        />
        <figcaption className="absolute top-3 left-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
          Before
        </figcaption>
      </figure>
      <figure className="relative overflow-hidden rounded-lg bg-surface-2">
        <img
          src={after}
          alt={`${alt}, after`}
          className="aspect-[4/3] h-full w-full object-cover"
        />
        <figcaption className="absolute top-3 right-3 rounded-sm bg-bg/80 px-2 py-1 text-[11px] font-medium tracking-wider text-fg uppercase">
          After
        </figcaption>
      </figure>
    </div>
  );
}
