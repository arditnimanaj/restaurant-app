import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu | Ember & Oak",
};

const CATEGORY_LABELS = {
  STARTER: "Starters",
  MAIN: "Mains",
  DESSERT: "Desserts",
  DRINK: "Drinks",
} as const;

export default async function MenuPage() {
  const items = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Menu</h1>
      <p className="mt-2 text-muted-foreground">
        Seasonal and subject to change based on availability.
      </p>

      <div className="mt-10 space-y-12">
        {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
          const categoryItems = grouped[category];
          if (!categoryItems?.length) return null;
          return (
            <section key={category}>
              <h2 className="text-xl font-medium">{label}</h2>
              <Separator className="mt-3 mb-6" />
              <div className="space-y-6">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        {items.length === 0 ? (
          <p className="text-muted-foreground">
            The menu is being updated. Please check back soon.
          </p>
        ) : null}
      </div>
    </div>
  );
}
