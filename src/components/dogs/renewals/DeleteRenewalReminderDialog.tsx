import { useState } from "react";

import type { RenewalReminder } from "../../../types/models/renewalReminder";
import { useDeleteRenewalReminder } from "../../../hooks/useRenewalReminders";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  reminder: RenewalReminder;
};

export default function DeleteRenewalReminderDialog({ reminder }: Props) {
  const [open, setOpen] = useState(false);

  const deleteReminder = useDeleteRenewalReminder();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${reminder.label}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() =>
          deleteReminder.mutate({ id: reminder.id, dogId: reminder.dogId })
        }
      />
    </>
  );
}
