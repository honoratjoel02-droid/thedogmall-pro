import { Bell } from "lucide-react";

import type { RenewalReminder } from "../../../types/models/renewalReminder";
import { advanceDueDate } from "../../../lib/renewals";
import { useUpdateRenewalReminder } from "../../../hooks/useRenewalReminders";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

import EditRenewalReminderDialog from "./EditRenewalReminderDialog";
import DeleteRenewalReminderDialog from "./DeleteRenewalReminderDialog";

type Props = {
  reminders: RenewalReminder[];
  isLoading?: boolean;
};

function statusFor(dueDate: string): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} {
  const diffDays = Math.floor(
    (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return { label: "En retard", variant: "destructive" };
  if (diffDays <= 30) return { label: "Bientôt", variant: "secondary" };
  return { label: "À jour", variant: "outline" };
}

export default function RenewalReminderList({
  reminders,
  isLoading = false,
}: Props) {
  const updateReminder = useUpdateRenewalReminder();

  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (reminders.length === 0) {
    return <EmptyState icon={Bell} label="Aucun rappel de renouvellement enregistré." />;
  }

  const sorted = [...reminders].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  );

  return (
    <div className="space-y-3">
      {sorted.map((reminder) => {
        const status = statusFor(reminder.dueDate);

        return (
          <Card key={reminder.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium">{reminder.label}</p>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant={status.variant}>{status.label}</Badge>

                  <span>{reminder.type}</span>

                  <span>
                    · Échéance :{" "}
                    {new Date(reminder.dueDate).toLocaleDateString("fr-FR")}
                  </span>

                  {reminder.recurrenceMonths && (
                    <span>· Tous les {reminder.recurrenceMonths} mois</span>
                  )}
                </div>

                {reminder.notes && (
                  <p className="text-sm text-muted-foreground">
                    {reminder.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {reminder.recurrenceMonths && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updateReminder.isPending}
                    onClick={() =>
                      updateReminder.mutate({
                        id: reminder.id,
                        data: {
                          dueDate: advanceDueDate(
                            reminder.dueDate,
                            reminder.recurrenceMonths!,
                          ),
                        },
                      })
                    }
                  >
                    Renouveler
                  </Button>
                )}

                <EditRenewalReminderDialog reminder={reminder} />
                <DeleteRenewalReminderDialog reminder={reminder} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
