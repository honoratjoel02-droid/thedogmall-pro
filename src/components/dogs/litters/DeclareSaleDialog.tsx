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

import DeclareSaleForm from "./DeclareSaleForm";

type Props = {
  puppy: Puppy;
};

export default function DeclareSaleDialog({ puppy }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>Marquer comme vendu</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Déclarer la vente — {puppy.identifier}</DialogTitle>
        </DialogHeader>

        <DeclareSaleForm puppy={puppy} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
