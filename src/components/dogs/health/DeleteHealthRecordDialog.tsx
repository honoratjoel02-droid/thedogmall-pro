import { useState } from "react";

import type { HealthRecord } from "../../../types/models/healthRecord";
import { useDeleteHealthRecord } from "../../../hooks/useHealthRecords";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  record: HealthRecord;
};

export default function DeleteHealthRecordDialog({ record }: Props) {
  const [open, setOpen] = useState(false);

  const deleteRecord = useDeleteHealthRecord();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${record.title}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() =>
          deleteRecord.mutate({ id: record.id, dogId: record.dogId })
        }
      />
    </>
  );
}
