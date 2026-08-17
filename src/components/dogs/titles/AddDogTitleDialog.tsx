import { useState } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import DogTitleForm from "./DogTitleForm";

type Props = {
  dogId: string;
};

export default function AddDogTitleDialog({ dogId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un titre</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau titre / récompense</DialogTitle>
        </DialogHeader>

        <DogTitleForm dogId={dogId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
