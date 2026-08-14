import { useState } from "react";

import type { Sale } from "../../../types/models/sale";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import PaymentForm from "./PaymentForm";

type Props = {
  sale: Sale;
  puppyIdentifier: string;
};

export default function AddPaymentDialog({ sale, puppyIdentifier }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" size="sm">
            Enregistrer un paiement
          </Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau paiement — {puppyIdentifier}</DialogTitle>
        </DialogHeader>

        <PaymentForm
          sale={sale}
          puppyIdentifier={puppyIdentifier}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
