import { useState } from "react";

import type { Client } from "../../types/models/client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import ClientForm from "./ClientForm";

type Props = {
  client: Client;
};

export default function EditClientDialog({ client }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" className="flex-1">
            Modifier
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Modifier {client.firstName} {client.lastName}
          </DialogTitle>
        </DialogHeader>

        <ClientForm client={client} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
