import { useState } from "react";

import type { AnnualGoal } from "../../types/models/annualGoal";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import AnnualGoalForm from "./AnnualGoalForm";

type Props = {
  goal: AnnualGoal;
};

export default function EditAnnualGoalDialog({ goal }: Props) {
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
          <DialogTitle>Modifier l'objectif {goal.year}</DialogTitle>
        </DialogHeader>

        <AnnualGoalForm goal={goal} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
