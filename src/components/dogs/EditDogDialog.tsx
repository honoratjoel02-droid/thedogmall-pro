import { useState } from "react";

import type { Dog } from "../../types/dog";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import DogForm from "./DogForm";

type Props = {
  dog: Dog;
};

export default function EditDogDialog({ dog }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} className="flex-1">
            Modifier
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier {dog.name}</DialogTitle>
        </DialogHeader>

        <DogForm dog={dog} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
