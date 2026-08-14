import { describe, it, expect } from "vitest";

import { predictNextHeat, DEFAULT_HEAT_INTERVAL_DAYS } from "./heatCycle";
import type { HeatCycle } from "../types/models/heatCycle";

function makeCycle(overrides: Partial<HeatCycle> & { id: string; startDate: string }): HeatCycle {
  return {
    dogId: "dog-1",
    createdAt: overrides.startDate,
    updatedAt: overrides.startDate,
    ...overrides,
  };
}

describe("predictNextHeat", () => {
  it("returns null when there are no recorded cycles", () => {
    expect(predictNextHeat([])).toBeNull();
  });

  it("uses the default interval when only one cycle is recorded", () => {
    const cycles = [makeCycle({ id: "1", startDate: "2026-01-01T00:00:00.000Z" })];

    const result = predictNextHeat(cycles);

    expect(result).not.toBeNull();
    expect(result?.averageIntervalDays).toBe(DEFAULT_HEAT_INTERVAL_DAYS);
    expect(result?.basedOnCycles).toBe(1);
    expect(result?.predictedDate).toBe(
      new Date(
        new Date("2026-01-01T00:00:00.000Z").getTime() +
          DEFAULT_HEAT_INTERVAL_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString(),
    );
  });

  it("averages the intervals between multiple cycles", () => {
    const cycles = [
      makeCycle({ id: "1", startDate: "2025-01-01T00:00:00.000Z" }),
      makeCycle({ id: "2", startDate: "2025-07-01T00:00:00.000Z" }),
      makeCycle({ id: "3", startDate: "2026-01-01T00:00:00.000Z" }),
    ];

    const result = predictNextHeat(cycles);

    expect(result).not.toBeNull();
    expect(result?.basedOnCycles).toBe(3);
    expect(result?.averageIntervalDays).toBeGreaterThan(170);
    expect(result?.averageIntervalDays).toBeLessThan(190);

    const predicted = new Date(result!.predictedDate).getTime();
    const lastStart = new Date("2026-01-01T00:00:00.000Z").getTime();

    expect(predicted).toBeGreaterThan(lastStart);
  });

  it("sorts unordered cycles before computing intervals", () => {
    const cycles = [
      makeCycle({ id: "2", startDate: "2026-01-01T00:00:00.000Z" }),
      makeCycle({ id: "1", startDate: "2025-07-01T00:00:00.000Z" }),
    ];

    const result = predictNextHeat(cycles);

    const predicted = new Date(result!.predictedDate).getTime();
    const lastStart = new Date("2026-01-01T00:00:00.000Z").getTime();

    expect(predicted).toBeGreaterThan(lastStart);
  });
});
