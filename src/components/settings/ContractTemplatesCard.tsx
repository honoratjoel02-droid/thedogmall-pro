import { FileText } from "lucide-react";

import { useContractTemplates } from "../../hooks/useContractTemplates";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import AddContractTemplateDialog from "./AddContractTemplateDialog";
import ContractTemplateList from "./ContractTemplateList";

export default function ContractTemplatesCard() {
  const { data: templates = [], isLoading } = useContractTemplates();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Modèles de contrats
        </CardTitle>

        <AddContractTemplateDialog />
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Personnalisez les clauses du contrat de cession. Le modèle par
          défaut est utilisé automatiquement lors de la génération d'un
          contrat.
        </p>

        <ContractTemplateList templates={templates} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
