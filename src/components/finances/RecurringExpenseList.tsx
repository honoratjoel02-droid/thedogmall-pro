import { Repeat } from "lucide-react";

import type { RecurringExpense } from "../../types/models/recurringExpense";
import { advanceRecurringDate } from "../../lib/recurringExpenses";
import { useUpdateRecurringExpense } from "../../hooks/useRecurringExpenses";
import { useCreateExpense } from "../../hooks/useExpenses";
import { useDogs } from "../../hooks/useDogs";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";

import EditRecurringExpenseDialog from "./EditRecurringExpenseDialog";
import DeleteRecurringExpenseDialog from "./DeleteRecurringExpenseDialog";

type Props = {
  items: RecurringExpense[];
  isLoading?: boolean;
};

function statusFor(
  dueDate: string,
  active: boolean,
): { label: string; variant: "default" | "secondary" | "destructive" | "outline" } {
  if (!active) return { label: "Inactive", variant: "outline" };

  const diffDays = Math.floor(
    (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return { label: "En retard", variant: "destructive" };
  if (diffDays <= 7) return { label: "Bientôt", variant: "secondary" };
  return { label: "À jour", variant: "outline" };
}

export default function RecurringExpenseList({
  items,
  isLoading = false,
}: Props) {
  const { data: dogs = [] } = useDogs();
  const updateItem = useUpdateRecurringExpense();
  const createExpense = useCreateExpense();

  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (items.length === 0) {
    return <EmptyState icon={Repeat} label="Aucune dépense récurrente enregistrée." />;
  }

  const sorted = [...items].sort((a, b) =>
    a.nextDueDate.localeCompare(b.nextDueDate),
  );

  function handleSettle(item: RecurringExpense) {
    createExpense.mutate({
      title: item.title,
      amount: item.amount,
      category: item.category,
      expenseDate: new Date().toISOString(),
      dogId: item.dogId,
      description: `Dépense récurrente (${item.frequency.toLowerCase()})`,
    });

    updateItem.mutate({
      id: item.id,
      data: { nextDueDate: advanceRecurringDate(item.nextDueDate, item.frequency) },
    });
  }

  return (
    <div className="space-y-3">
      {sorted.map((item) => {
        const status = statusFor(item.nextDueDate, item.active);
        const dog = dogs.find((d) => d.id === item.dogId);

        return (
          <Card key={item.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium">{item.title}</p>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant={status.variant}>{status.label}</Badge>

                  <span>{item.category}</span>

                  <span>· {item.amount.toLocaleString("fr-FR")} FCFA</span>

                  <span>· {item.frequency}</span>

                  <span>
                    · Prochaine échéance :{" "}
                    {new Date(item.nextDueDate).toLocaleDateString("fr-FR")}
                  </span>

                  {dog && <span>· {dog.name}</span>}
                </div>

                {item.notes && (
                  <p className="text-sm text-muted-foreground">{item.notes}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={createExpense.isPending || updateItem.isPending}
                  onClick={() => handleSettle(item)}
                >
                  Enregistrer le paiement
                </Button>

                <EditRecurringExpenseDialog item={item} />
                <DeleteRecurringExpenseDialog item={item} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
