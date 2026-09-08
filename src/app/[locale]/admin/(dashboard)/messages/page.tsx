import { prisma } from "@/lib/db";
import { MessagesManager, type SerializedMessage } from "./messages-manager";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized: SerializedMessage[] = messages.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    message: m.message,
    read: m.read,
    createdAt: m.createdAt.toISOString(),
  }));

  return <MessagesManager messages={serialized} />;
}
