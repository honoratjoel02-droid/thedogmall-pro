// src/lib/temperamentTest.test.ts

import { describe, expect, it } from "vitest";

import {
  VOLHARD_TEMPERAMENT_TEST,
  computeTemperamentProfile,
  createEmptyTemperamentTest,
} from "./temperamentTest";
import type { TemperamentTestItem } from "../types/models/puppy";

describe("createEmptyTemperamentTest", () => {
  it("creates one unscored item per test definition", () => {
    const test = createEmptyTemperamentTest("2026-01-01T00:00:00.000Z");

    expect(test.date).toBe("2026-01-01T00:00:00.000Z");
    expect(test.items).toHaveLength(VOLHARD_TEMPERAMENT_TEST.length);
    expect(test.items.every((item) => item.score === 0)).toBe(true);
  });
});

describe("computeTemperamentProfile", () => {
  it("returns null when no item has been scored", () => {
    const items: TemperamentTestItem[] = createEmptyTemperamentTest().items;

    expect(computeTemperamentProfile(items)).toBeNull();
  });

  it("ignores unscored items when averaging", () => {
    const items: TemperamentTestItem[] = [
      { id: "a", label: "A", score: 3 },
      { id: "b", label: "B", score: 0 },
    ];

    expect(computeTemperamentProfile(items)).toBe("Équilibré");
  });

  it("classifies a low average as Dominant", () => {
    const items: TemperamentTestItem[] = [
      { id: "a", label: "A", score: 1 },
      { id: "b", label: "B", score: 2 },
    ];

    expect(computeTemperamentProfile(items)).toBe("Dominant");
  });

  it("classifies a mid average as Équilibré", () => {
    const items: TemperamentTestItem[] = [
      { id: "a", label: "A", score: 3 },
      { id: "b", label: "B", score: 3 },
    ];

    expect(computeTemperamentProfile(items)).toBe("Équilibré");
  });

  it("classifies a higher average as Indépendant", () => {
    const items: TemperamentTestItem[] = [
      { id: "a", label: "A", score: 4 },
      { id: "b", label: "B", score: 4 },
    ];

    expect(computeTemperamentProfile(items)).toBe("Indépendant");
  });

  it("classifies a high average as Craintif", () => {
    const items: TemperamentTestItem[] = [
      { id: "a", label: "A", score: 6 },
      { id: "b", label: "B", score: 5 },
    ];

    expect(computeTemperamentProfile(items)).toBe("Craintif");
  });
});
