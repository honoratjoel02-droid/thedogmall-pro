import { useState } from "react";

import type { FeedingLog } from "../../../types/models/feedingLog";
import { useDeleteFeedingLog } from "../../../hooks/useFeedingLogs";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  log: FeedingLog;
};

export default function DeleteFeedingLogDialog({ log }: Props) {
  const [open, setOpen] = useState(false);

  const deleteLog = useDeleteFeedingLog();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer le régime "${log.foodBrand}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteLog.mutate({ id: log.id, dogId: log.dogId })}
      />
    </>
  );
}
