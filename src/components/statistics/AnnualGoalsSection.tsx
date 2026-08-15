import type { Litter } from "../../types/models/litter";
import type { Income } from "../../types/models/income";
import type { Sale } from "../../types/models/sale";
import { useAnnualGoals } from "../../hooks/useAnnualGoals";

import { Card, CardContent } from "../ui/card";

import AnnualGoalCard from "./AnnualGoalCard";
import AddAnnualGoalDialog from "./AddAnnualGoalDialog";

type Props = {
  litters: Litter[];
  incomes: Income[];
  sales: Sale[];
};

export default function AnnualGoalsSection({ litters, incomes, sales }: Props) {
  const { data: goals = [], isLoading } = useAnnualGoals();

  const sorted = [...goals].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold">Objectifs d'élevage annuels</h2>

        <AddAnnualGoalDialog />
      </div>

      {isLoading && (
        <div className="flex h-32 items-center justify-center text-muted-foreground">
          Chargement...
        </div>
      )}

      {!isLoading && sorted.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Aucun objectif défini. Ajoutez une cible annuelle pour suivre la
            progression de l'élevage.
          </CardContent>
        </Card>
      )}

      {sorted.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {sorted.map((goal) => (
            <AnnualGoalCard
              key={goal.id}
              goal={goal}
              litters={litters}
              incomes={incomes}
              sales={sales}
            />
          ))}
        </div>
      )}
    </div>
  );
}
