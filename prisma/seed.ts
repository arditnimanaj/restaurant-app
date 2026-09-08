import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: "Burrata & Heirloom Tomato",
        description: "Creamy burrata, heirloom tomatoes, basil oil, sea salt.",
        price: 14,
        category: "STARTER",
      },
      {
        name: "Crispy Calamari",
        description: "Lightly fried calamari, lemon aioli, chili flakes.",
        price: 12,
        category: "STARTER",
      },
      {
        name: "Wood-Fired Ribeye",
        description: "14oz ribeye, roasted garlic butter, seasonal greens.",
        price: 38,
        category: "MAIN",
      },
      {
        name: "Wild Mushroom Risotto",
        description: "Arborio rice, mixed wild mushrooms, parmesan, truffle oil.",
        price: 24,
        category: "MAIN",
      },
      {
        name: "Pan-Seared Salmon",
        description: "Citrus glaze, charred asparagus, herb potatoes.",
        price: 27,
        category: "MAIN",
      },
      {
        name: "Chocolate Fondant",
        description: "Warm dark chocolate cake, molten center, vanilla gelato.",
        price: 10,
        category: "DESSERT",
      },
      {
        name: "Lemon Tart",
        description: "Buttery shortcrust, tangy lemon curd, torched meringue.",
        price: 9,
        category: "DESSERT",
      },
      {
        name: "House Red Blend",
        description: "Glass of our sommelier's rotating red blend.",
        price: 11,
        category: "DRINK",
      },
      {
        name: "Craft Old Fashioned",
        description: "Bourbon, bitters, orange peel, house-made syrup.",
        price: 13,
        category: "DRINK",
      },
    ],
    skipDuplicates: true,
  });

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
