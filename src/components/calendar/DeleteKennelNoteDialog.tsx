import { useState } from "react";

import type { KennelNote } from "../../types/models/kennelNote";
import { useDeleteKennelNote } from "../../hooks/useKennelNotes";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  note: KennelNote;
};

export default function DeleteKennelNoteDialog({ note }: Props) {
  const [open, setOpen] = useState(false);

  const deleteNote = useDeleteKennelNote();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${note.title}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteNote.mutate(note.id)}
      />
    </>
  );
}
