import { prisma } from "@/lib/db";
import { localizeMenuItem } from "@/lib/menu-i18n";
import { HomeHero } from "./home-hero";
import { FeaturedMenu, type FeaturedItem } from "./featured-menu";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const featuredItems = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: { createdAt: "asc" },
    take: 3,
  });

  const items: FeaturedItem[] = featuredItems.map((item) =>
    localizeMenuItem(
      {
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        imageUrl: item.imageUrl,
      },
      locale,
    ),
  );

  return (
    <div>
      <HomeHero />
      <FeaturedMenu items={items} />
    </div>
  );
}
