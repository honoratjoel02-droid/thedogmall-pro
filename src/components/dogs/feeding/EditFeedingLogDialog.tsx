import { useState } from "react";

import type { FeedingLog } from "../../../types/models/feedingLog";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import FeedingLogForm from "./FeedingLogForm";

type Props = {
  log: FeedingLog;
};

export default function EditFeedingLogDialog({ log }: Props) {
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
          <DialogTitle>Modifier le régime alimentaire</DialogTitle>
        </DialogHeader>

        <FeedingLogForm
          dogId={log.dogId}
          log={log}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
