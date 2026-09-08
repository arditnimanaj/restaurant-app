"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function markMessageRead(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const read = String(formData.get("read")) === "true";
  if (!id) throw new Error("Missing id");

  await prisma.contactMessage.update({ where: { id }, data: { read } });

  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  await prisma.contactMessage.delete({ where: { id } });

  revalidatePath("/admin/messages");
}
