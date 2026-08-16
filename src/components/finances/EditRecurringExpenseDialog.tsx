import { useState } from "react";

import type { RecurringExpense } from "../../types/models/recurringExpense";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import RecurringExpenseForm from "./RecurringExpenseForm";

type Props = {
  item: RecurringExpense;
};

export default function EditRecurringExpenseDialog({ item }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" size="sm">
            Modifier
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la dépense récurrente</DialogTitle>
        </DialogHeader>

        <RecurringExpenseForm item={item} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
