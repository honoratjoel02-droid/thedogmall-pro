import { useState } from "react";

import type { WaitlistEntry } from "../../../types/models/waitlistEntry";
import { useDeleteWaitlistEntry } from "../../../hooks/useWaitlist";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  entry: WaitlistEntry;
};

export default function DeleteWaitlistEntryDialog({ entry }: Props) {
  const [open, setOpen] = useState(false);

  const deleteEntry = useDeleteWaitlistEntry();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Retirer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Retirer cette inscription ?"
        description="Le client sera retiré de la liste d'attente de cette portée."
        confirmLabel="Retirer"
        onConfirm={() => deleteEntry.mutate(entry)}
      />
    </>
  );
}
