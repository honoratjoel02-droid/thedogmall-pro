import { useState } from "react";

import type { Expense } from "../../types/models/expense";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import ExpenseForm from "./ExpenseForm";

type Props = {
  expense: Expense;
};

export default function EditExpenseDialog({ expense }: Props) {
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
          <DialogTitle>Modifier la dépense</DialogTitle>
        </DialogHeader>

        <ExpenseForm expense={expense} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
