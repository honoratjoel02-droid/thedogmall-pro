import { useState } from "react";

import type { HeatCycle } from "../../../types/models/heatCycle";
import { useDeleteHeatCycle } from "../../../hooks/useHeatCycles";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  cycle: HeatCycle;
};

export default function DeleteHeatCycleDialog({ cycle }: Props) {
  const [open, setOpen] = useState(false);

  const deleteCycle = useDeleteHeatCycle();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Supprimer cette chaleur ?"
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() =>
          deleteCycle.mutate({ id: cycle.id, dogId: cycle.dogId })
        }
      />
    </>
  );
}
