import { describe, it, expect } from "vitest";

import { getCurrentDiet } from "./feeding";
import type { FeedingLog } from "../types/models/feedingLog";

function makeLog(overrides: Partial<FeedingLog> & { id: string; date: string }): FeedingLog {
  return {
    dogId: "dog-1",
    foodBrand: "Croquettes X",
    dailyQuantityGrams: 300,
    mealsPerDay: 2,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("getCurrentDiet", () => {
  it("returns null when there are no entries", () => {
    expect(getCurrentDiet([])).toBeNull();
  });

  it("returns the entry with the most recent date", () => {
    const older = makeLog({ id: "a", date: "2024-01-01" });
    const newer = makeLog({ id: "b", date: "2024-06-01" });

    expect(getCurrentDiet([older, newer])?.id).toBe("b");
  });

  it("returns the most recent entry regardless of input order", () => {
    const older = makeLog({ id: "a", date: "2023-01-01" });
    const middle = makeLog({ id: "b", date: "2024-01-01" });
    const newer = makeLog({ id: "c", date: "2024-06-01" });

    expect(getCurrentDiet([newer, older, middle])?.id).toBe("c");
  });
});
