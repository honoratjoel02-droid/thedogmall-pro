import { useState } from "react";

import type { ContractTemplate } from "../../types/models/contractTemplate";
import { useDeleteContractTemplate } from "../../hooks/useContractTemplates";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  template: ContractTemplate;
};

export default function DeleteContractTemplateDialog({ template }: Props) {
  const [open, setOpen] = useState(false);

  const deleteTemplate = useDeleteContractTemplate();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${template.name}" ?`}
        description="Cette action est définitive. Les ventes déjà générées avec ce modèle ne sont pas affectées."
        confirmLabel="Supprimer"
        onConfirm={() => deleteTemplate.mutate(template.id)}
      />
    </>
  );
}
