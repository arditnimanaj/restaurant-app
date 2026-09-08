import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const items = [
  {
    name: "Burrata & Heirloom Tomato",
    description: "Creamy burrata, heirloom tomatoes, basil oil, sea salt.",
    price: 14,
    category: "STARTER" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1760023570385-ee484f7076b3?w=800&q=80",
  },
  {
    name: "Crispy Calamari",
    description: "Lightly fried calamari, lemon aioli, chili flakes.",
    price: 12,
    category: "STARTER" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1778600731531-7d836a32704c?w=800&q=80",
  },
  {
    name: "Wood-Fired Ribeye",
    description: "14oz ribeye, roasted garlic butter, seasonal greens.",
    price: 38,
    category: "MAIN" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1761138785048-9dae4abb0a0c?w=800&q=80",
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, mixed wild mushrooms, parmesan, truffle oil.",
    price: 24,
    category: "MAIN" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&q=80",
  },
  {
    name: "Pan-Seared Salmon",
    description: "Citrus glaze, charred asparagus, herb potatoes.",
    price: 27,
    category: "MAIN" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  },
  {
    name: "Chocolate Fondant",
    description: "Warm dark chocolate cake, molten center, vanilla gelato.",
    price: 10,
    category: "DESSERT" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=800&q=80",
  },
  {
    name: "Lemon Tart",
    description: "Buttery shortcrust, tangy lemon curd, torched meringue.",
    price: 9,
    category: "DESSERT" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1541781550486-81b7a2328578?w=800&q=80",
  },
  {
    name: "House Red Blend",
    description: "Glass of our sommelier's rotating red blend.",
    price: 11,
    category: "DRINK" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1630369160812-26c7604cbd8c?w=800&q=80",
  },
  {
    name: "Craft Old Fashioned",
    description: "Bourbon, bitters, orange peel, house-made syrup.",
    price: 13,
    category: "DRINK" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1638884904408-fbc6ab0c200f?w=800&q=80",
  },
];

async function main() {
  for (const item of items) {
    const existing = await prisma.menuItem.findFirst({
      where: { name: item.name },
    });
    if (existing) {
      await prisma.menuItem.update({ where: { id: existing.id }, data: item });
    } else {
      await prisma.menuItem.create({ data: item });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
