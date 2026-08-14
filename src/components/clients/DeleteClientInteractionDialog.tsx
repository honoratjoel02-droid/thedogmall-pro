import { useState } from "react";

import type { ClientInteraction } from "../../types/models/clientInteraction";
import { useDeleteClientInteraction } from "../../hooks/useClientInteractions";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  interaction: ClientInteraction;
};

export default function DeleteClientInteractionDialog({ interaction }: Props) {
  const [open, setOpen] = useState(false);

  const deleteInteraction = useDeleteClientInteraction();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Supprimer cet échange ?"
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteInteraction.mutate(interaction)}
      />
    </>
  );
}
