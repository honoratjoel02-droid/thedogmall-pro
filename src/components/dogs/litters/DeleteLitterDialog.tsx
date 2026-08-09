import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Litter } from "../../../types/models/litter";
import { useDeleteLitter } from "../../../hooks/useLitters";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  litter: Litter;
  redirectAfterDelete?: boolean;
};

export default function DeleteLitterDialog({
  litter,
  redirectAfterDelete = false,
}: Props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const deleteLitter = useDeleteLitter();

  async function handleDelete() {
    await deleteLitter.mutateAsync(litter.id);

    if (redirectAfterDelete) {
      navigate("/litters");
    }
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Supprimer cette portée ?"
        description="Cette action est définitive. Les chiots déjà enregistrés pour cette portée resteront en base mais ne seront plus accessibles depuis l'interface."
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
      />
    </>
  );
}
