import { useState } from "react";

import type { KennelNote } from "../../types/models/kennelNote";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import KennelNoteForm from "./KennelNoteForm";

type Props = {
  note: KennelNote;
};

export default function EditKennelNoteDialog({ note }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" size="sm">
            Modifier
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la note</DialogTitle>
        </DialogHeader>

        <KennelNoteForm note={note} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
