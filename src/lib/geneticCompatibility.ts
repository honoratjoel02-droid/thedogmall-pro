import type { GeneticTest, GeneticTestResult } from "../types/models/geneticTest";

export type CompatibilityRisk = "high" | "moderate" | "clear" | "unknown";

export interface TestComparison {
  testName: string;
  sireResult: GeneticTestResult;
  damResult: GeneticTestResult;
  risk: CompatibilityRisk;
}

const RISK_ORDER: Record<CompatibilityRisk, number> = {
  high: 0,
  moderate: 1,
  unknown: 2,
  clear: 3,
};

function latestResultByTestName(tests: GeneticTest[]): Map<string, GeneticTest> {
  const byName = new Map<string, GeneticTest>();

  for (const test of tests) {
    const key = test.testName.trim().toLowerCase();
    const existing = byName.get(key);

    if (!existing || test.testDate.localeCompare(existing.testDate) > 0) {
      byName.set(key, test);
    }
  }

  return byName;
}

function assessRisk(
  sireResult: GeneticTestResult,
  damResult: GeneticTestResult,
): CompatibilityRisk {
  if (sireResult === "En attente" || damResult === "En attente") {
    return "unknown";
  }

  if (sireResult === "Normal" && damResult === "Normal") {
    return "clear";
  }

  if (sireResult === "Porteur" && damResult === "Porteur") {
    return "high";
  }

  if (sireResult === "Atteint" || damResult === "Atteint") {
    return sireResult === "Normal" || damResult === "Normal" ? "moderate" : "high";
  }

  return "moderate";
}

export function computeGeneticCompatibility(
  sireTests: GeneticTest[],
  damTests: GeneticTest[],
): TestComparison[] {
  const sireByName = latestResultByTestName(sireTests);
  const damByName = latestResultByTestName(damTests);

  const comparisons: TestComparison[] = [];

  for (const [key, sireTest] of sireByName) {
    const damTest = damByName.get(key);

    if (!damTest) continue;

    comparisons.push({
      testName: sireTest.testName,
      sireResult: sireTest.result,
      damResult: damTest.result,
      risk: assessRisk(sireTest.result, damTest.result),
    });
  }

  return comparisons.sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk]);
}
