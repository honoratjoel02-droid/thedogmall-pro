import { useState } from "react";

import type { Puppy } from "../../../types/models/puppy";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import PuppyForm from "./PuppyForm";

type Props = {
  puppy: Puppy;
};

export default function EditPuppyDialog({ puppy }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline">
            Modifier
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier {puppy.identifier}</DialogTitle>
        </DialogHeader>

        <PuppyForm
          litterId={puppy.litterId}
          puppy={puppy}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
