// src/lib/socializationChecklist.test.ts

import { describe, expect, it } from "vitest";

import {
  computeChecklistDate,
  mergeChecklistEntries,
  type ChecklistItem,
} from "./socializationChecklist";

describe("computeChecklistDate", () => {
  it("offsets the birth date by the given number of days", () => {
    expect(computeChecklistDate("2026-01-01T00:00:00.000Z", 21)).toBe(
      new Date("2026-01-22T00:00:00.000Z").toISOString(),
    );
  });
});

describe("mergeChecklistEntries", () => {
  const items: ChecklistItem[] = [
    { id: "a", label: "Manipulation des pattes", ageDays: 21 },
    { id: "b", label: "Marche sur surfaces", ageDays: 28 },
  ];

  it("adds all checklist items when none exist yet", () => {
    const result = mergeChecklistEntries([], items, "2026-01-01T00:00:00.000Z");

    expect(result.map((e) => e.label)).toEqual([
      "Manipulation des pattes",
      "Marche sur surfaces",
    ]);
    expect(result.every((e) => e.done === false)).toBe(true);
  });

  it("skips items whose label already exists, keeping the existing entry", () => {
    const existing = [
      {
        id: "existing",
        label: "Manipulation des pattes",
        date: "2026-01-10T00:00:00.000Z",
        done: true,
      },
    ];

    const result = mergeChecklistEntries(existing, items, "2026-01-01T00:00:00.000Z");

    expect(result).toHaveLength(2);
    expect(result.find((e) => e.label === "Manipulation des pattes")).toEqual(
      existing[0],
    );
    expect(result.find((e) => e.label === "Marche sur surfaces")).toBeDefined();
  });

  it("returns entries sorted by date", () => {
    const reversedItems: ChecklistItem[] = [
      { id: "b", label: "Marche sur surfaces", ageDays: 28 },
      { id: "a", label: "Manipulation des pattes", ageDays: 21 },
    ];

    const result = mergeChecklistEntries([], reversedItems, "2026-01-01T00:00:00.000Z");

    expect(result.map((e) => e.label)).toEqual([
      "Manipulation des pattes",
      "Marche sur surfaces",
    ]);
  });
});
