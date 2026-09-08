import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Ember & Oak",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Since day one
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          Our story
        </h1>
      </div>
      <div className="mt-10 space-y-4 text-muted-foreground">
        <p>
          Ember &amp; Oak opened with a simple idea: cook good ingredients over
          real fire, and let them speak for themselves. Our kitchen is built
          around a wood-burning hearth, and nearly everything that comes out of
          it &mdash; from the bread to the dessert &mdash; passes near the
          flame at some point.
        </p>
        <p>
          We work with local farms and fishmongers to build a menu that
          changes with the seasons. It&rsquo;s a small dining room with a big
          focus on hospitality &mdash; we want every table to feel like a
          regular&rsquo;s table.
        </p>
        <p>
          Whether you&rsquo;re joining us for a quiet weeknight dinner or a
          celebration, we&rsquo;re glad you&rsquo;re here.
        </p>
      </div>
    </div>
  );
}
