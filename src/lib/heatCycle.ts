// src/lib/heatCycle.ts

import type { HeatCycle } from "../types/models/heatCycle";

export const DEFAULT_HEAT_INTERVAL_DAYS = 182;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface NextHeatPrediction {
  predictedDate: string;
  averageIntervalDays: number;
  basedOnCycles: number;
}

export function predictNextHeat(cycles: HeatCycle[]): NextHeatPrediction | null {
  if (cycles.length === 0) return null;

  const sorted = [...cycles].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );
  const lastStart = new Date(sorted[sorted.length - 1].startDate).getTime();

  if (sorted.length === 1) {
    return {
      predictedDate: new Date(
        lastStart + DEFAULT_HEAT_INTERVAL_DAYS * DAY_MS,
      ).toISOString(),
      averageIntervalDays: DEFAULT_HEAT_INTERVAL_DAYS,
      basedOnCycles: 1,
    };
  }

  const intervals: number[] = [];

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].startDate).getTime();
    const curr = new Date(sorted[i].startDate).getTime();

    intervals.push((curr - prev) / DAY_MS);
  }

  const averageIntervalDays = Math.round(
    intervals.reduce((sum, n) => sum + n, 0) / intervals.length,
  );

  return {
    predictedDate: new Date(lastStart + averageIntervalDays * DAY_MS).toISOString(),
    averageIntervalDays,
    basedOnCycles: sorted.length,
  };
}
