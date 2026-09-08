import Link from "next/link";

const COLUMNS = [
  {
    label: "Address",
    lines: ["123 Market Street", "Springfield, USA"],
  },
  {
    label: "Hours",
    lines: ["Tue–Sun: 5:00 PM – 10:00 PM", "Closed Mondays"],
  },
  {
    label: "Call",
    lines: ["(555) 123-4567"],
  },
  {
    label: "Email",
    lines: ["hello@emberandoak.com"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <p className="font-heading text-2xl tracking-wide">
          Ember <span className="text-primary">&amp;</span> Oak
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Seasonal, wood-fired cooking in the heart of the city.
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                {col.label}
              </p>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {col.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/reservations"
            className="border-b border-primary/50 pb-1 text-xs tracking-widest text-primary uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Book a table
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs tracking-wide text-muted-foreground">
        &copy; {new Date().getFullYear()} Ember &amp; Oak. All rights reserved.
      </div>
    </footer>
  );
}
