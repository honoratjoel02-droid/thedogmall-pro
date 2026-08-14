import { useState } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import WaitlistForm from "./WaitlistForm";

type Props = {
  litterId: string;
  nextPosition: number;
};

export default function AddWaitlistEntryDialog({ litterId, nextPosition }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props}>+ Ajouter à la liste d'attente</Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle inscription en liste d'attente</DialogTitle>
        </DialogHeader>

        <WaitlistForm
          litterId={litterId}
          nextPosition={nextPosition}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
