"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  createMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
  updateMenuItem,
} from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SerializedMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "STARTER" | "MAIN" | "DESSERT" | "DRINK";
  available: boolean;
  imageUrl: string | null;
};

const CATEGORIES = ["STARTER", "MAIN", "DESSERT", "DRINK"] as const;

function MenuItemFields({ item }: { item?: SerializedMenuItem }) {
  const t = useTranslations("admin.menuManager");

  return (
    <div className="space-y-4">
      {item ? <input type="hidden" name="id" defaultValue={item.id} /> : null}
      <div className="space-y-2">
        <Label htmlFor="name">{t("fields.name")}</Label>
        <Input id="name" name="name" defaultValue={item?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">{t("fields.description")}</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">{t("fields.price")}</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={item?.price}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">{t("fields.category")}</Label>
          <Select name="category" defaultValue={item?.category ?? "MAIN"}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`categories.${value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">{t("fields.imageUrl")}</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://..."
          defaultValue={item?.imageUrl ?? ""}
        />
      </div>
    </div>
  );
}

function AddMenuItemDialog() {
  const t = useTranslations("admin.menuManager");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>{t("addItem")}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addItemTitle")}</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await createMenuItem(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <MenuItemFields />
          <Button type="submit" className="w-full">
            {t("saveItem")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditMenuItemDialog({ item }: { item: SerializedMenuItem }) {
  const t = useTranslations("admin.menuManager");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        {t("edit")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editItemTitle")}</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await updateMenuItem(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <MenuItemFields item={item} />
          <Button type="submit" className="w-full">
            {t("saveChanges")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteMenuItemButton({ id, name }: { id: string; name: string }) {
  const t = useTranslations("admin.menuManager");

  return (
    <form
      action={deleteMenuItem}
      onSubmit={(event) => {
        if (!window.confirm(t("deleteConfirm", { name }))) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="ghost" size="sm" className="text-destructive">
        {t("delete")}
      </Button>
    </form>
  );
}

function AvailabilityToggle({ item }: { item: SerializedMenuItem }) {
  return (
    <Switch
      checked={item.available}
      onCheckedChange={(checked) => toggleMenuItemAvailability(item.id, checked)}
    />
  );
}

export function MenuManager({ items }: { items: SerializedMenuItem[] }) {
  const t = useTranslations("admin.menuManager");
  const grouped = items.reduce<Record<string, SerializedMenuItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl tracking-wide">{t("title")}</h1>
        <AddMenuItemDialog />
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        CATEGORIES.map((category) => {
          const categoryItems = grouped[category];
          if (!categoryItems?.length) return null;
          return (
            <div key={category}>
              <h2 className="mb-3 text-lg font-medium">{t(`categories.${category}`)}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>{t("table.name")}</TableHead>
                    <TableHead>{t("table.price")}</TableHead>
                    <TableHead>{t("table.available")}</TableHead>
                    <TableHead className="text-right">{t("table.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="size-12 rounded-md object-cover"
                          />
                        ) : (
                          <div className="size-12 rounded-md bg-muted" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <AvailabilityToggle item={item} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <EditMenuItemDialog item={item} />
                          <DeleteMenuItemButton id={item.id} name={item.name} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        })
      )}
    </div>
  );
}
