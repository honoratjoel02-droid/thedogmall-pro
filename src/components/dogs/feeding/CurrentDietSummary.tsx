import { UtensilsCrossed, Info } from "lucide-react";

import type { FeedingLog } from "../../../types/models/feedingLog";
import { getCurrentDiet } from "../../../lib/feeding";

type Props = {
  logs: FeedingLog[];
};

export default function CurrentDietSummary({ logs }: Props) {
  const current = getCurrentDiet(logs);

  if (!current) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p>Aucun régime alimentaire enregistré pour ce chien.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 rounded-md border border-border bg-muted/30 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="size-4 shrink-0 text-foreground" />

        <p className="text-sm">
          Régime actuel : <span className="font-semibold">{current.foodBrand}</span>
        </p>
      </div>

      <p className="pl-6 text-xs text-muted-foreground">
        {current.dailyQuantityGrams} g/jour · {current.mealsPerDay} repas/jour
        · depuis le {new Date(current.date).toLocaleDateString("fr-FR")}
      </p>
    </div>
  );
}
