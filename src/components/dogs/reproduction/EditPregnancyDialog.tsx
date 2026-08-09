import { useState } from "react";

import type { Pregnancy } from "../../../types/models/pregnancy";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import PregnancyForm from "./PregnancyForm";

type Props = {
  pregnancy: Pregnancy;
};

export default function EditPregnancyDialog({ pregnancy }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline">
            Mettre à jour le suivi
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Suivi de gestation</DialogTitle>
        </DialogHeader>

        <PregnancyForm pregnancy={pregnancy} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
