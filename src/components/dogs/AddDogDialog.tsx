import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import DogForm, { type DogFormValues } from "./DogForm";

type AddDogDialogProps = {
  onAddDog: (values: DogFormValues) => void;
};

export default function AddDogDialog({ onAddDog }: AddDogDialogProps) {
  const [open, setOpen] = useState(false);

  function handleSubmit(values: DogFormValues) {
    onAddDog(values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus data-icon="inline-start" />
        Ajouter un chien
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un chien</DialogTitle>
          <DialogDescription>
            Renseignez les informations du chien à ajouter à votre élevage.
          </DialogDescription>
        </DialogHeader>

        <DogForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
