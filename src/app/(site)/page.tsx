import { prisma } from "@/lib/db";
import { HomeHero } from "./home-hero";
import { FeaturedMenu, type FeaturedItem } from "./featured-menu";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredItems = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: { createdAt: "asc" },
    take: 3,
  });

  const items: FeaturedItem[] = featuredItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    imageUrl: item.imageUrl,
  }));

  return (
    <div>
      <HomeHero />
      <FeaturedMenu items={items} />
    </div>
  );
}
