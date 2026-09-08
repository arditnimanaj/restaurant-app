export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-tight">Ember &amp; Oak</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Seasonal, wood-fired cooking in the heart of the city.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Hours</p>
          <p className="mt-2">Tue&ndash;Sun: 5:00 PM &ndash; 10:00 PM</p>
          <p>Closed Mondays</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Find us</p>
          <p className="mt-2">123 Market Street</p>
          <p>Springfield, USA</p>
          <p>(555) 123-4567</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Ember &amp; Oak. All rights reserved.
      </div>
    </footer>
  );
}
