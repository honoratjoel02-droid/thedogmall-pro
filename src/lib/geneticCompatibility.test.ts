import { describe, it, expect } from "vitest";

import { computeGeneticCompatibility } from "./geneticCompatibility";
import type { GeneticTest, GeneticTestResult } from "../types/models/geneticTest";

function makeTest(overrides: Partial<GeneticTest> & { dogId: string }): GeneticTest {
  return {
    id: `${overrides.dogId}-${overrides.testName ?? "test"}-${Math.random()}`,
    testName: "DM",
    testDate: "2024-01-01",
    result: "Normal",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("computeGeneticCompatibility", () => {
  it("returns an empty list when there is no shared test", () => {
    const sireTests = [makeTest({ dogId: "sire", testName: "DM" })];
    const damTests = [makeTest({ dogId: "dam", testName: "PRA" })];

    expect(computeGeneticCompatibility(sireTests, damTests)).toEqual([]);
  });

  it.each<[GeneticTestResult, GeneticTestResult, string]>([
    ["Porteur", "Porteur", "high"],
    ["Atteint", "Atteint", "high"],
    ["Atteint", "Porteur", "high"],
    ["Atteint", "Normal", "moderate"],
    ["Porteur", "Normal", "moderate"],
    ["Normal", "Normal", "clear"],
    ["En attente", "Normal", "unknown"],
  ])("rates %s x %s as %s", (sireResult, damResult, expectedRisk) => {
    const sireTests = [makeTest({ dogId: "sire", testName: "DM", result: sireResult })];
    const damTests = [makeTest({ dogId: "dam", testName: "DM", result: damResult })];

    const [comparison] = computeGeneticCompatibility(sireTests, damTests);

    expect(comparison.risk).toBe(expectedRisk);
  });

  it("matches test names case-insensitively and ignoring whitespace", () => {
    const sireTests = [makeTest({ dogId: "sire", testName: " dm " })];
    const damTests = [makeTest({ dogId: "dam", testName: "DM" })];

    const comparisons = computeGeneticCompatibility(sireTests, damTests);

    expect(comparisons).toHaveLength(1);
  });

  it("uses the most recent result when a dog has retaken a test", () => {
    const sireTests = [
      makeTest({ dogId: "sire", testName: "DM", result: "Porteur", testDate: "2022-01-01" }),
      makeTest({ dogId: "sire", testName: "DM", result: "Normal", testDate: "2024-01-01" }),
    ];
    const damTests = [makeTest({ dogId: "dam", testName: "DM", result: "Normal" })];

    const [comparison] = computeGeneticCompatibility(sireTests, damTests);

    expect(comparison.sireResult).toBe("Normal");
    expect(comparison.risk).toBe("clear");
  });

  it("sorts comparisons with the highest risk first", () => {
    const sireTests = [
      makeTest({ dogId: "sire", testName: "DM", result: "Normal" }),
      makeTest({ dogId: "sire", testName: "PRA", result: "Porteur" }),
    ];
    const damTests = [
      makeTest({ dogId: "dam", testName: "DM", result: "Normal" }),
      makeTest({ dogId: "dam", testName: "PRA", result: "Porteur" }),
    ];

    const comparisons = computeGeneticCompatibility(sireTests, damTests);

    expect(comparisons[0].testName).toBe("PRA");
    expect(comparisons[0].risk).toBe("high");
    expect(comparisons[1].testName).toBe("DM");
    expect(comparisons[1].risk).toBe("clear");
  });
});
