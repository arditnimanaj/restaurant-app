"use client";

import { deleteMessage, markMessageRead } from "./actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type SerializedMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function MessagesManager({
  messages,
}: {
  messages: SerializedMessage[];
}) {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl tracking-wide">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.read ? "opacity-70" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{message.name}</p>
                    {!message.read ? <Badge>New</Badge> : null}
                  </div>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={message.id} />
                    <input
                      type="hidden"
                      name="read"
                      value={(!message.read).toString()}
                    />
                    <Button type="submit" variant="outline" size="sm">
                      Mark as {message.read ? "unread" : "read"}
                    </Button>
                  </form>
                  <form
                    action={deleteMessage}
                    onSubmit={(event) => {
                      if (!window.confirm(`Delete message from ${message.name}?`)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={message.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      Delete
                    </Button>
                  </form>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
