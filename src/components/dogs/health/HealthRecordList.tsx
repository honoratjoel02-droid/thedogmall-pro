import type { HealthRecord } from "../../../types/models/healthRecord";

import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";

import EditHealthRecordDialog from "./EditHealthRecordDialog";
import DeleteHealthRecordDialog from "./DeleteHealthRecordDialog";

type Props = {
  records: HealthRecord[];
  isLoading?: boolean;
};

export default function HealthRecordList({ records, isLoading = false }: Props) {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun suivi santé enregistré.
      </div>
    );
  }

  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3">
      {sorted.map((record) => {
        const overdue = !record.done && record.date.slice(0, 10) < today;

        return (
          <Card key={record.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium">
                  {record.title}
                  {record.type === "Pesée" && record.weightKg
                    ? ` — ${record.weightKg} kg`
                    : ""}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{record.type}</Badge>

                  <span className={overdue ? "text-destructive" : undefined}>
                    {new Date(record.date).toLocaleDateString("fr-FR")}
                  </span>

                  {!record.done && (
                    <Badge variant={overdue ? "destructive" : "secondary"}>
                      {overdue ? "En retard" : "À prévoir"}
                    </Badge>
                  )}
                </div>

                {record.notes && (
                  <p className="text-sm text-muted-foreground">
                    {record.notes}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <EditHealthRecordDialog record={record} />
                <DeleteHealthRecordDialog record={record} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
