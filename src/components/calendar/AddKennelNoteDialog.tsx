import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import KennelNoteForm from "./KennelNoteForm";

export default function AddKennelNoteDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Nouvelle note</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle note d'élevage</DialogTitle>
        </DialogHeader>

        <KennelNoteForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
