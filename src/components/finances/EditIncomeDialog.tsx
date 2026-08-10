import { useState } from "react";

import type { Income } from "../../types/models/income";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import IncomeForm from "./IncomeForm";

type Props = {
  income: Income;
};

export default function EditIncomeDialog({ income }: Props) {
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
          <DialogTitle>Modifier la recette</DialogTitle>
        </DialogHeader>

        <IncomeForm income={income} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
