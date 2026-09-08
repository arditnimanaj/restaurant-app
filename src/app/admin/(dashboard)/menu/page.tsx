import { prisma } from "@/lib/db";
import { MenuManager, type SerializedMenuItem } from "./menu-manager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const serialized: SerializedMenuItem[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: item.category,
    available: item.available,
    imageUrl: item.imageUrl,
  }));

  return <MenuManager items={serialized} />;
}
