// src/lib/vaccinationSchedule.test.ts

import { describe, expect, it } from "vitest";

import {
  computeScheduleDate,
  mergeScheduleEntries,
  type ScheduleItem,
} from "./vaccinationSchedule";

describe("computeScheduleDate", () => {
  it("offsets the birth date by the given number of days", () => {
    expect(computeScheduleDate("2026-01-01T00:00:00.000Z", 15)).toBe(
      new Date("2026-01-16T00:00:00.000Z").toISOString(),
    );
  });
});

describe("mergeScheduleEntries", () => {
  const items: ScheduleItem[] = [
    { id: "a", label: "Vermifuge J15", ageDays: 15, kind: "deworming" },
    { id: "b", label: "Vermifuge J30", ageDays: 30, kind: "deworming" },
  ];

  it("adds all schedule items when none exist yet", () => {
    const result = mergeScheduleEntries([], items, "2026-01-01T00:00:00.000Z");

    expect(result.map((e) => e.label)).toEqual(["Vermifuge J15", "Vermifuge J30"]);
    expect(result.every((e) => e.done === false)).toBe(true);
  });

  it("skips items whose label already exists, keeping the existing entry", () => {
    const existing = [
      { id: "existing", label: "Vermifuge J15", date: "2026-01-10T00:00:00.000Z", done: true },
    ];

    const result = mergeScheduleEntries(existing, items, "2026-01-01T00:00:00.000Z");

    expect(result).toHaveLength(2);
    expect(result.find((e) => e.label === "Vermifuge J15")).toEqual(existing[0]);
    expect(result.find((e) => e.label === "Vermifuge J30")).toBeDefined();
  });

  it("returns entries sorted by date", () => {
    const reversedItems: ScheduleItem[] = [
      { id: "b", label: "Vermifuge J30", ageDays: 30, kind: "deworming" },
      { id: "a", label: "Vermifuge J15", ageDays: 15, kind: "deworming" },
    ];

    const result = mergeScheduleEntries([], reversedItems, "2026-01-01T00:00:00.000Z");

    expect(result.map((e) => e.label)).toEqual(["Vermifuge J15", "Vermifuge J30"]);
  });
});
