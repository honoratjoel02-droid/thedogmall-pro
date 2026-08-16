import { useState } from "react";

import type { RecurringExpense } from "../../types/models/recurringExpense";
import { useDeleteRecurringExpense } from "../../hooks/useRecurringExpenses";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  item: RecurringExpense;
};

export default function DeleteRecurringExpenseDialog({ item }: Props) {
  const [open, setOpen] = useState(false);

  const deleteItem = useDeleteRecurringExpense();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${item.title}" ?`}
        description="Cette action est définitive. Les dépenses déjà enregistrées ne sont pas affectées."
        confirmLabel="Supprimer"
        onConfirm={() => deleteItem.mutate(item.id)}
      />
    </>
  );
}
