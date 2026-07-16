import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";

import DogForm from "./DogForm";

export default function AddDogDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Ajouter un chien</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau chien</DialogTitle>
        </DialogHeader>

        <DogForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
