import { useState } from "react";

import type { Litter } from "../../../types/models/litter";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import LitterForm from "./LitterForm";

type Props = {
  litter: Litter;
};

export default function EditLitterDialog({ litter }: Props) {
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
          <DialogTitle>Modifier la portée</DialogTitle>
        </DialogHeader>

        <LitterForm litter={litter} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
