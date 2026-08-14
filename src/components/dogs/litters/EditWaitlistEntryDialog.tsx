import { useState } from "react";

import type { WaitlistEntry } from "../../../types/models/waitlistEntry";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import WaitlistForm from "./WaitlistForm";

type Props = {
  entry: WaitlistEntry;
};

export default function EditWaitlistEntryDialog({ entry }: Props) {
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'inscription</DialogTitle>
        </DialogHeader>

        <WaitlistForm
          litterId={entry.litterId}
          nextPosition={entry.position}
          entry={entry}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
