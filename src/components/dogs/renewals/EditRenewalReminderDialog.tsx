import { useState } from "react";

import type { RenewalReminder } from "../../../types/models/renewalReminder";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import RenewalReminderForm from "./RenewalReminderForm";

type Props = {
  reminder: RenewalReminder;
};

export default function EditRenewalReminderDialog({ reminder }: Props) {
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
          <DialogTitle>Modifier le rappel</DialogTitle>
        </DialogHeader>

        <RenewalReminderForm
          dogId={reminder.dogId}
          reminder={reminder}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
