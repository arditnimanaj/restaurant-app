"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const CATEGORIES = ["STARTER", "MAIN", "DESSERT", "DRINK"] as const;

function parseCategory(value: FormDataEntryValue | null) {
  const category = CATEGORIES.find((c) => c === value);
  if (!category) throw new Error("Invalid category");
  return category;
}

export async function createMenuItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = parseCategory(formData.get("category"));

  if (!name || !description || Number.isNaN(price) || price < 0) {
    throw new Error("Invalid menu item data");
  }

  await prisma.menuItem.create({
    data: { name, description, price, category },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateMenuItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = parseCategory(formData.get("category"));

  if (!id || !name || !description || Number.isNaN(price) || price < 0) {
    throw new Error("Invalid menu item data");
  }

  await prisma.menuItem.update({
    where: { id },
    data: { name, description, price, category },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteMenuItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  await prisma.menuItem.delete({ where: { id } });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function toggleMenuItemAvailability(id: string, available: boolean) {
  if (!id) throw new Error("Missing id");

  await prisma.menuItem.update({ where: { id }, data: { available } });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
