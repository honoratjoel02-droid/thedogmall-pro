import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { Button } from "../../ui/button";

import PuppyForm from "./PuppyForm";

type Props = {
  litterId: string;
};

export default function AddPuppyDialog({ litterId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un chiot</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau chiot</DialogTitle>
        </DialogHeader>

        <PuppyForm litterId={litterId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
