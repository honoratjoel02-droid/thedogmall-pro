import { useState } from "react";

import type { HeatCycle } from "../../../types/models/heatCycle";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import HeatCycleForm from "./HeatCycleForm";

type Props = {
  cycle: HeatCycle;
};

export default function EditHeatCycleDialog({ cycle }: Props) {
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
          <DialogTitle>Modifier la chaleur</DialogTitle>
        </DialogHeader>

        <HeatCycleForm
          dogId={cycle.dogId}
          cycle={cycle}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
