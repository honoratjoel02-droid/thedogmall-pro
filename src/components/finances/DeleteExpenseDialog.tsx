import { useState } from "react";

import type { Expense } from "../../types/models/expense";
import { useDeleteExpense } from "../../hooks/useExpenses";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  expense: Expense;
};

export default function DeleteExpenseDialog({ expense }: Props) {
  const [open, setOpen] = useState(false);

  const deleteExpense = useDeleteExpense();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${expense.title}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteExpense.mutate(expense.id)}
      />
    </>
  );
}
