import type { FeedingLog } from "../../../types/models/feedingLog";

import { Card, CardContent } from "../../ui/card";

import EditFeedingLogDialog from "./EditFeedingLogDialog";
import DeleteFeedingLogDialog from "./DeleteFeedingLogDialog";

type Props = {
  logs: FeedingLog[];
  isLoading?: boolean;
};

export default function FeedingLogList({ logs, isLoading = false }: Props) {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun régime alimentaire enregistré.
      </div>
    );
  }

  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      {sorted.map((log) => (
        <Card key={log.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">{log.foodBrand}</p>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(log.date).toLocaleDateString("fr-FR")}</span>
                <span>·</span>
                <span>{log.dailyQuantityGrams} g / jour</span>
                <span>·</span>
                <span>
                  {log.mealsPerDay} repas/jour
                </span>
              </div>

              {log.notes && (
                <p className="text-sm text-muted-foreground">{log.notes}</p>
              )}
            </div>

            <div className="flex gap-2">
              <EditFeedingLogDialog log={log} />
              <DeleteFeedingLogDialog log={log} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
