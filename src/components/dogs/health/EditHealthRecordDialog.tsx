import { useState } from "react";

import type { HealthRecord } from "../../../types/models/healthRecord";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import HealthRecordForm from "./HealthRecordForm";

type Props = {
  record: HealthRecord;
};

export default function EditHealthRecordDialog({ record }: Props) {
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
          <DialogTitle>Modifier le suivi</DialogTitle>
        </DialogHeader>

        <HealthRecordForm
          dogId={record.dogId}
          record={record}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
