// src/lib/weight.test.ts

import { describe, expect, it } from "vitest";

import { getCurrentWeightKg } from "./weight";

describe("getCurrentWeightKg", () => {
  it("falls back to the static weight when no history exists", () => {
    expect(getCurrentWeightKg({ weight: 24, weightHistory: [] })).toBe(24);
  });

  it("uses the most recent weigh-in when history exists", () => {
    const dog = {
      weight: 24,
      weightHistory: [
        { date: "2026-01-01", weightGrams: 24000 },
        { date: "2026-03-01", weightGrams: 25500 },
      ],
    };

    expect(getCurrentWeightKg(dog)).toBe(25.5);
  });
});
