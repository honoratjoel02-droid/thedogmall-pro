import { useState } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import HealthRecordForm from "./HealthRecordForm";

type Props = {
  dogId: string;
};

export default function AddHealthRecordDialog({ dogId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un suivi</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau suivi santé</DialogTitle>
        </DialogHeader>

        <HealthRecordForm dogId={dogId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
