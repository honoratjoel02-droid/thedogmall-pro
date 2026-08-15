import type { AnnualGoal } from "../../types/models/annualGoal";
import type { Litter } from "../../types/models/litter";
import type { Income } from "../../types/models/income";
import type { Sale } from "../../types/models/sale";
import { computeAnnualProgress } from "../../lib/annualProgress";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import EditAnnualGoalDialog from "./EditAnnualGoalDialog";
import DeleteAnnualGoalDialog from "./DeleteAnnualGoalDialog";

type Props = {
  goal: AnnualGoal;
  litters: Litter[];
  incomes: Income[];
  sales: Sale[];
};

function ProgressRow({
  label,
  actual,
  target,
  formatValue = (v) => String(v),
}: {
  label: string;
  actual: number;
  target: number;
  formatValue?: (value: number) => string;
}) {
  const pct = target > 0 ? Math.min((actual / target) * 100, 100) : 0;
  const reached = actual >= target;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className={`font-medium ${reached ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
          {formatValue(actual)} / {formatValue(target)}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${reached ? "bg-emerald-500" : "bg-primary"}`}
          style={{ width: `${Math.max(pct, actual > 0 ? 2 : 0)}%` }}
        />
      </div>
    </div>
  );
}

export default function AnnualGoalCard({ goal, litters, incomes, sales }: Props) {
  const progress = computeAnnualProgress(goal.year, litters, incomes, sales);

  const hasAnyTarget =
    goal.targetLitters != null ||
    goal.targetRevenue != null ||
    goal.targetReservations != null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{goal.year}</CardTitle>

        <div className="flex gap-2">
          <EditAnnualGoalDialog goal={goal} />
          <DeleteAnnualGoalDialog goal={goal} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasAnyTarget && (
          <p className="text-sm text-muted-foreground">
            Aucune cible définie pour cette année.
          </p>
        )}

        {goal.targetLitters != null && (
          <ProgressRow
            label="Portées"
            actual={progress.littersCount}
            target={goal.targetLitters}
          />
        )}

        {goal.targetRevenue != null && (
          <ProgressRow
            label="Chiffre d'affaires"
            actual={progress.revenue}
            target={goal.targetRevenue}
            formatValue={(v) => `${v.toLocaleString("fr-FR")} FCFA`}
          />
        )}

        {goal.targetReservations != null && (
          <ProgressRow
            label="Réservations concrétisées (ventes)"
            actual={progress.reservationsCount}
            target={goal.targetReservations}
          />
        )}

        {goal.notes && (
          <p className="text-sm text-muted-foreground">{goal.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
