import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import ClientInteractionForm from "./ClientInteractionForm";

type Props = {
  clientId: string;
};

export default function AddClientInteractionDialog({ clientId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un échange</Button>}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel échange</DialogTitle>
        </DialogHeader>

        <ClientInteractionForm
          clientId={clientId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
