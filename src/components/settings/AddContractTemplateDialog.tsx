import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import ContractTemplateForm from "./ContractTemplateForm";

export default function AddContractTemplateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Nouveau modèle</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau modèle de contrat</DialogTitle>
        </DialogHeader>

        <ContractTemplateForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
