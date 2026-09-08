"use client";

import { useLocale, useTranslations } from "next-intl";
import { deleteReservation, updateReservationStatus } from "./actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SerializedReservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  partySize: number;
  notes: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

const STATUS_VARIANT: Record<
  SerializedReservation["status"],
  "default" | "secondary" | "destructive"
> = {
  PENDING: "secondary",
  CONFIRMED: "default",
  CANCELLED: "destructive",
};

function StatusSelect({ reservation }: { reservation: SerializedReservation }) {
  const t = useTranslations("admin.reservationsManager.statuses");

  return (
    <Select
      value={reservation.status}
      onValueChange={(value) =>
        updateReservationStatus(
          reservation.id,
          value as SerializedReservation["status"],
        )
      }
    >
      <SelectTrigger size="sm" className="w-[130px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">{t("PENDING")}</SelectItem>
        <SelectItem value="CONFIRMED">{t("CONFIRMED")}</SelectItem>
        <SelectItem value="CANCELLED">{t("CANCELLED")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ReservationsManager({
  reservations,
}: {
  reservations: SerializedReservation[];
}) {
  const t = useTranslations("admin.reservationsManager");
  const tStatus = useTranslations("admin.reservationsManager.statuses");
  const locale = useLocale();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl tracking-wide">{t("title")}</h1>
      {reservations.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.guest")}</TableHead>
              <TableHead>{t("table.dateTime")}</TableHead>
              <TableHead>{t("table.party")}</TableHead>
              <TableHead>{t("table.status")}</TableHead>
              <TableHead className="text-right">{t("table.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  <div className="font-medium">{reservation.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {reservation.email} · {reservation.phone}
                  </div>
                  {reservation.notes ? (
                    <div className="mt-1 text-sm text-muted-foreground">
                      &ldquo;{reservation.notes}&rdquo;
                    </div>
                  ) : null}
                </TableCell>
                <TableCell>
                  {new Date(reservation.date).toLocaleString(locale, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell>{reservation.partySize}</TableCell>
                <TableCell>
                  <div className="flex flex-col items-start gap-2">
                    <Badge variant={STATUS_VARIANT[reservation.status]}>
                      {tStatus(reservation.status)}
                    </Badge>
                    <StatusSelect reservation={reservation} />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <form
                    action={deleteReservation}
                    onSubmit={(event) => {
                      if (
                        !window.confirm(
                          t("deleteConfirm", { name: reservation.name }),
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={reservation.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      {t("delete")}
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
