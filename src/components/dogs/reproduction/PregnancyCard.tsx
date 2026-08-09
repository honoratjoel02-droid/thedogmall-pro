import { Link } from "react-router-dom";

import type { Pregnancy, PregnancyStatus } from "../../../types/models/pregnancy";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

import EditPregnancyDialog from "./EditPregnancyDialog";

type Props = {
  pregnancy: Pregnancy;
};

const STATUS_VARIANT: Record<
  PregnancyStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  "En cours": "secondary",
  Confirmée: "default",
  Terminée: "outline",
  Interrompue: "destructive",
};

function formatDate(value?: string) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("fr-FR");
}

export default function PregnancyCard({ pregnancy }: Props) {
  const today = new Date();
  const expected = new Date(pregnancy.expectedBirthDate);
  const daysRemaining = Math.ceil(
    (expected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Suivi de gestation</CardTitle>

        <Badge variant={STATUS_VARIANT[pregnancy.status]}>
          {pregnancy.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Date prévue de mise bas
            </p>

            <p className="font-medium">
              {formatDate(pregnancy.expectedBirthDate)}
              {pregnancy.status === "En cours" ||
              pregnancy.status === "Confirmée" ? (
                <span className="ml-2 text-sm text-muted-foreground">
                  {daysRemaining >= 0
                    ? `(dans ${daysRemaining} j)`
                    : `(dépassée de ${Math.abs(daysRemaining)} j)`}
                </span>
              ) : null}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Chiots estimés (radio)
            </p>

            <p className="font-medium">
              {pregnancy.puppyCountEstimate ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Échographie</p>

            <p className="font-medium">
              {formatDate(pregnancy.ultrasoundDate)}
              {pregnancy.ultrasoundResult
                ? ` — ${pregnancy.ultrasoundResult}`
                : ""}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Radiographie</p>

            <p className="font-medium">
              {formatDate(pregnancy.xrayDate)}
              {pregnancy.xrayResult ? ` — ${pregnancy.xrayResult}` : ""}
            </p>
          </div>
        </div>

        {pregnancy.notes && (
          <div>
            <p className="text-sm text-muted-foreground">Notes</p>

            <p className="font-medium">{pregnancy.notes}</p>
          </div>
        )}

        <EditPregnancyDialog pregnancy={pregnancy} />

        {pregnancy.status === "Terminée" && (
          <Button
            className="ml-2"
            render={(props) => (
              <Link {...props} to="/litters">
                Créer la portée →
              </Link>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
