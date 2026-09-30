export function PhotoGuide() {
  const shots = [
    {
      n: "1",
      title: "Close on the rash",
      body: "The lip, where the curb hit. One photo per damaged wheel.",
    },
    {
      n: "2",
      title: "The whole wheel",
      body: "Step back so the face and the tire are in the frame.",
    },
    {
      n: "3",
      title: "The city",
      body: "Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, or Enterprise.",
    },
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Quote
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Three things in the text.
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {shots.map((shot) => (
            <li
              key={shot.n}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <p className="font-display text-3xl font-semibold text-accent">
                {shot.n}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                {shot.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{shot.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          That’s enough for a number. If the photo shows a bend or a crack,
          I’ll say so — that is not an on-car cosmetic job.
        </p>
      </div>
    </section>
  );
}
