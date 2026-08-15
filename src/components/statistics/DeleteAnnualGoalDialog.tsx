import { useState } from "react";

import type { AnnualGoal } from "../../types/models/annualGoal";
import { useDeleteAnnualGoal } from "../../hooks/useAnnualGoals";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  goal: AnnualGoal;
};

export default function DeleteAnnualGoalDialog({ goal }: Props) {
  const [open, setOpen] = useState(false);

  const deleteGoal = useDeleteAnnualGoal();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer l'objectif ${goal.year} ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteGoal.mutate(goal.id)}
      />
    </>
  );
}
