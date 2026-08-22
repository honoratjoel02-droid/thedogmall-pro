import type { HeatCycle } from "../../../types/models/heatCycle";

import { Card, CardContent } from "../../ui/card";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

import EditHeatCycleDialog from "./EditHeatCycleDialog";
import DeleteHeatCycleDialog from "./DeleteHeatCycleDialog";

type Props = {
  cycles: HeatCycle[];
  isLoading?: boolean;
};

export default function HeatCycleList({ cycles, isLoading = false }: Props) {
  if (isLoading) {
    return <LoadingState rows={2} rowClassName="h-10" />;
  }

  if (cycles.length === 0) {
    return <EmptyState label="Aucune chaleur enregistrée." />;
  }

  const sorted = [...cycles].sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <div className="space-y-3">
      {sorted.map((cycle) => (
        <Card key={cycle.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">
                {new Date(cycle.startDate).toLocaleDateString("fr-FR")}
              </p>

              {cycle.notes && (
                <p className="text-sm text-muted-foreground">{cycle.notes}</p>
              )}
            </div>

            <div className="flex gap-2">
              <EditHeatCycleDialog cycle={cycle} />
              <DeleteHeatCycleDialog cycle={cycle} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
