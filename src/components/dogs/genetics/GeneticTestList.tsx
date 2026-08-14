import type {
  GeneticTest,
  GeneticTestResult,
} from "../../../types/models/geneticTest";

import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";

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
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun test génétique enregistré.
      </div>
    );
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
