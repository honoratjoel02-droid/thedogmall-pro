import { useState } from "react";

import type { ClientInteraction } from "../../types/models/clientInteraction";

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
  interaction: ClientInteraction;
};

export default function EditClientInteractionDialog({ interaction }: Props) {
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
          <DialogTitle>Modifier l'échange</DialogTitle>
        </DialogHeader>

        <ClientInteractionForm
          clientId={interaction.clientId}
          interaction={interaction}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
