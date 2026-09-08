"use client";

import { useState } from "react";
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
};

const CATEGORY_LABELS: Record<SerializedMenuItem["category"], string> = {
  STARTER: "Starter",
  MAIN: "Main",
  DESSERT: "Dessert",
  DRINK: "Drink",
};

function MenuItemFields({ item }: { item?: SerializedMenuItem }) {
  return (
    <div className="space-y-4">
      {item ? <input type="hidden" name="id" defaultValue={item.id} /> : null}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={item?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
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
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={item?.category ?? "MAIN"}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function AddMenuItemDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Add item</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add menu item</DialogTitle>
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
            Save item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditMenuItemDialog({ item }: { item: SerializedMenuItem }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit menu item</DialogTitle>
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
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteMenuItemButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteMenuItem}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="ghost" size="sm" className="text-destructive">
        Delete
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
  const grouped = items.reduce<Record<string, SerializedMenuItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Menu</h1>
        <AddMenuItemDialog />
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No menu items yet. Add your first one above.
        </p>
      ) : (
        Object.entries(CATEGORY_LABELS).map(([category, label]) => {
          const categoryItems = grouped[category];
          if (!categoryItems?.length) return null;
          return (
            <div key={category}>
              <h2 className="mb-3 text-lg font-medium">{label}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryItems.map((item) => (
                    <TableRow key={item.id}>
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
