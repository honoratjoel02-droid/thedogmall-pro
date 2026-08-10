import { useState } from "react";

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
  defaultDogId?: string;
  defaultLitterId?: string;
  label?: string;
};

export default function AddExpenseDialog({
  defaultDogId,
  defaultLitterId,
  label = "+ Nouvelle dépense",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={(props) => <Button {...props}>{label}</Button>} />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle dépense</DialogTitle>
        </DialogHeader>

        <ExpenseForm
          defaultDogId={defaultDogId}
          defaultLitterId={defaultLitterId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
