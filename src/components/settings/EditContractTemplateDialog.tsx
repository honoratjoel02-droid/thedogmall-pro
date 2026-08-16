import { useState } from "react";

import type { ContractTemplate } from "../../types/models/contractTemplate";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import ContractTemplateForm from "./ContractTemplateForm";

type Props = {
  template: ContractTemplate;
};

export default function EditContractTemplateDialog({ template }: Props) {
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
          <DialogTitle>Modifier le modèle</DialogTitle>
        </DialogHeader>

        <ContractTemplateForm
          template={template}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
