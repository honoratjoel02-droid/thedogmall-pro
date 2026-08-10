import { useState } from "react";

import type { Income } from "../../types/models/income";
import { useDeleteIncome } from "../../hooks/useIncomes";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  income: Income;
};

export default function DeleteIncomeDialog({ income }: Props) {
  const [open, setOpen] = useState(false);

  const deleteIncome = useDeleteIncome();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${income.title}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteIncome.mutate(income.id)}
      />
    </>
  );
}
