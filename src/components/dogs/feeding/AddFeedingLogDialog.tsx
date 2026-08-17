import { useState } from "react";

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
  dogId: string;
};

export default function AddFeedingLogDialog({ dogId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un régime</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau régime alimentaire</DialogTitle>
        </DialogHeader>

        <FeedingLogForm dogId={dogId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
