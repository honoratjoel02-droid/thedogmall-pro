import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { Button } from "../../ui/button";

import LitterForm from "./LitterForm";

export default function AddLitterDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Nouvelle portée</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle portée</DialogTitle>
        </DialogHeader>

        <LitterForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
