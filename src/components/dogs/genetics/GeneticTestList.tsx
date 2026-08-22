import { Dna } from "lucide-react";

import type {
  GeneticTest,
  GeneticTestResult,
} from "../../../types/models/geneticTest";

import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

import EditGeneticTestDialog from "./EditGeneticTestDialog";
import DeleteGeneticTestDialog from "./DeleteGeneticTestDialog";

type Props = {
  tests: GeneticTest[];
  isLoading?: boolean;
};

const RESULT_VARIANT: Record<
  GeneticTestResult,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Normal: "default",
  Porteur: "secondary",
  Atteint: "destructive",
  "En attente": "outline",
};

export default function GeneticTestList({ tests, isLoading = false }: Props) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (tests.length === 0) {
    return <EmptyState icon={Dna} label="Aucun test génétique enregistré." />;
  }

  const sorted = [...tests].sort((a, b) => b.testDate.localeCompare(a.testDate));

  return (
    <div className="space-y-3">
      {sorted.map((test) => (
        <Card key={test.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">{test.testName}</p>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant={RESULT_VARIANT[test.result]}>{test.result}</Badge>

                <span>{new Date(test.testDate).toLocaleDateString("fr-FR")}</span>

                {test.laboratory && <span>· {test.laboratory}</span>}
              </div>

              {test.notes && (
                <p className="text-sm text-muted-foreground">{test.notes}</p>
              )}
            </div>

            <div className="flex gap-2">
              <EditGeneticTestDialog test={test} />
              <DeleteGeneticTestDialog test={test} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
