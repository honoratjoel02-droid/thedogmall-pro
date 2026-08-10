import { HeartPulse } from "lucide-react";

import {
  GESTATION_DURATION,
  gestationDay,
  gestationProgress,
  remainingGestationDays,
} from "../../../lib/gestation";

type Props = {
  breedingDate: string;
};

export default function GestationProgress({ breedingDate }: Props) {
  const day = gestationDay(breedingDate);

  const progress = gestationProgress(breedingDate);

  const remaining = remainingGestationDays(breedingDate);

  return (
    <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <HeartPulse className="size-4 text-primary" />
          Gestation
        </span>

        <span className="text-sm text-muted-foreground">
          Jour {day} / {GESTATION_DURATION}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-green-600 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>{Math.round(progress)} %</span>

        <span>{remaining} jours restants</span>
      </div>
    </div>
  );
}
