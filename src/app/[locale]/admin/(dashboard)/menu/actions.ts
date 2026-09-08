"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const CATEGORIES = ["STARTER", "MAIN", "DESSERT", "DRINK"] as const;

function parseCategory(value: FormDataEntryValue | null) {
  const category = CATEGORIES.find((c) => c === value);
  if (!category) throw new Error("Invalid category");
  return category;
}

function revalidateMenuPaths() {
  for (const path of [
    "/admin/menu",
    "/de/admin/menu",
    "/menu",
    "/de/menu",
    "/",
    "/de",
  ]) {
    revalidatePath(path);
  }
}

export async function createMenuItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = parseCategory(formData.get("category"));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!name || !description || Number.isNaN(price) || price < 0) {
    throw new Error("Invalid menu item data");
  }

  await prisma.menuItem.create({
    data: { name, description, price, category, imageUrl: imageUrl || null },
  });

  revalidateMenuPaths();
}

export async function updateMenuItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = parseCategory(formData.get("category"));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!id || !name || !description || Number.isNaN(price) || price < 0) {
    throw new Error("Invalid menu item data");
  }

  await prisma.menuItem.update({
    where: { id },
    data: { name, description, price, category, imageUrl: imageUrl || null },
  });

  revalidateMenuPaths();
}

export async function deleteMenuItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  await prisma.menuItem.delete({ where: { id } });

  revalidateMenuPaths();
}

export async function toggleMenuItemAvailability(id: string, available: boolean) {
  if (!id) throw new Error("Missing id");

  await prisma.menuItem.update({ where: { id }, data: { available } });

  revalidateMenuPaths();
}
