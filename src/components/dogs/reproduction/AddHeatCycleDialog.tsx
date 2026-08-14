import { useState } from "react";

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
  dogId: string;
};

export default function AddHeatCycleDialog({ dogId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline">
            + Enregistrer une chaleur
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle chaleur</DialogTitle>
        </DialogHeader>

        <HeatCycleForm dogId={dogId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
