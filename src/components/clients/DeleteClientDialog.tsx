import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Client } from "../../types/models/client";
import { useDeleteClient } from "../../hooks/useClients";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  client: Client;
  redirectAfterDelete?: boolean;
};

export default function DeleteClientDialog({
  client,
  redirectAfterDelete = false,
}: Props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const deleteClient = useDeleteClient();

  async function handleDelete() {
    await deleteClient.mutateAsync(client.id);

    if (redirectAfterDelete) {
      navigate("/clients");
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        className="flex-1"
        onClick={() => setOpen(true)}
      >
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer ${client.firstName} ${client.lastName} ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
      />
    </>
  );
}
