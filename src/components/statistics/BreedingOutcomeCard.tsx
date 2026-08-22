import { CheckCircle2, XCircle, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  successful: number;
  failed: number;
  pending: number;
};

const ROWS = [
  {
    key: "successful" as const,
    label: "Réussies",
    icon: CheckCircle2,
    classes: "bg-success/10 text-success",
  },
  {
    key: "failed" as const,
    label: "Échouées",
    icon: XCircle,
    classes: "bg-destructive/10 text-destructive",
  },
  {
    key: "pending" as const,
    label: "En cours",
    icon: Clock,
    classes: "bg-muted text-muted-foreground",
  },
];

export default function BreedingOutcomeCard({
  successful,
  failed,
  pending,
}: Props) {
  const values = { successful, failed, pending };
  const total = successful + failed + pending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Résultat des saillies</CardTitle>
      </CardHeader>

      <CardContent>
        {total === 0 ? (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            Aucune saillie enregistrée.
          </div>
        ) : (
          <div className="space-y-3">
            {ROWS.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${row.classes}`}
                  >
                    <row.icon className="size-4" />
                  </div>

                  <span className="font-medium">{row.label}</span>
                </div>

                <span className="text-lg font-bold">{values[row.key]}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
