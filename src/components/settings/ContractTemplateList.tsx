import { FileText } from "lucide-react";

import type { ContractTemplate } from "../../types/models/contractTemplate";
import { useUpdateContractTemplate } from "../../hooks/useContractTemplates";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";

import EditContractTemplateDialog from "./EditContractTemplateDialog";
import DeleteContractTemplateDialog from "./DeleteContractTemplateDialog";

type Props = {
  templates: ContractTemplate[];
  isLoading?: boolean;
};

export default function ContractTemplateList({
  templates,
  isLoading = false,
}: Props) {
  const updateTemplate = useUpdateContractTemplate();

  if (isLoading) {
    return <LoadingState rows={2} />;
  }

  if (templates.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        label="Aucun modèle personnalisé. Le contrat standard est utilisé par défaut."
      />
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{template.name}</p>

                {template.isDefault && <Badge>Par défaut</Badge>}
              </div>

              <p className="text-sm text-muted-foreground">
                {template.clauses.length} clause
                {template.clauses.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {!template.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={updateTemplate.isPending}
                  onClick={() =>
                    updateTemplate.mutate({
                      id: template.id,
                      data: { isDefault: true },
                    })
                  }
                >
                  Définir par défaut
                </Button>
              )}

              <EditContractTemplateDialog template={template} />
              <DeleteContractTemplateDialog template={template} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
