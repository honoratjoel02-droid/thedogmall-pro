import { CalendarClock, Info } from "lucide-react";

import type { HeatCycle } from "../../../types/models/heatCycle";
import { predictNextHeat } from "../../../lib/heatCycle";

type Props = {
  cycles: HeatCycle[];
};

const SOON_WINDOW_DAYS = 14;

export default function NextHeatEstimate({ cycles }: Props) {
  const prediction = predictNextHeat(cycles);

  if (!prediction) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p>
          Enregistrez une première chaleur pour activer l'estimation de la
          prochaine.
        </p>
      </div>
    );
  }

  const daysUntil = Math.floor(
    (new Date(prediction.predictedDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const tone =
    daysUntil < 0
      ? { text: "text-destructive", bg: "bg-destructive/10 border-destructive/30" }
      : daysUntil <= SOON_WINDOW_DAYS
        ? {
            text: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/30",
          }
        : {
            text: "text-foreground",
            bg: "bg-muted/30 border-border",
          };

  return (
    <div className={`space-y-1 rounded-md border px-3 py-2.5 ${tone.bg}`}>
      <div className="flex items-center gap-2">
        <CalendarClock className={`size-4 shrink-0 ${tone.text}`} />

        <p className="text-sm">
          Prochaine chaleur estimée :{" "}
          <span className={`font-semibold ${tone.text}`}>
            {new Date(prediction.predictedDate).toLocaleDateString("fr-FR")}
          </span>
        </p>
      </div>

      <p className="pl-6 text-xs text-muted-foreground">
        {prediction.basedOnCycles > 1
          ? `Basé sur ${prediction.basedOnCycles} chaleurs, intervalle moyen de ${prediction.averageIntervalDays} jours.`
          : `Estimation par défaut (${prediction.averageIntervalDays} jours) — s'affinera avec une deuxième chaleur enregistrée.`}
      </p>
    </div>
  );
}
