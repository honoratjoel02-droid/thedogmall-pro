import { describe, it, expect } from "vitest";

import {
  computeChecklistDate,
  mergeWhelpingChecklist,
  DEFAULT_WHELPING_CHECKLIST,
} from "./whelpingChecklist";
import type { CareEntry } from "../types/models/puppy";

describe("computeChecklistDate", () => {
  it("subtracts the given number of days from the due date", () => {
    const result = computeChecklistDate("2024-06-15T00:00:00.000Z", 7);

    expect(result.slice(0, 10)).toBe("2024-06-08");
  });
});

describe("mergeWhelpingChecklist", () => {
  it("adds all default items when the checklist is empty", () => {
    const result = mergeWhelpingChecklist([], DEFAULT_WHELPING_CHECKLIST, "2024-06-15T00:00:00.000Z");

    expect(result).toHaveLength(DEFAULT_WHELPING_CHECKLIST.length);
    expect(result.every((entry) => entry.done === false)).toBe(true);
  });

  it("does not duplicate items already present by label", () => {
    const existing: CareEntry[] = [
      {
        id: "existing-1",
        label: DEFAULT_WHELPING_CHECKLIST[0].label,
        date: "2024-06-01T00:00:00.000Z",
        done: true,
      },
    ];

    const result = mergeWhelpingChecklist(existing, DEFAULT_WHELPING_CHECKLIST, "2024-06-15T00:00:00.000Z");

    expect(result).toHaveLength(DEFAULT_WHELPING_CHECKLIST.length);
    expect(result.filter((e) => e.label === DEFAULT_WHELPING_CHECKLIST[0].label)).toHaveLength(1);
    expect(result.find((e) => e.label === DEFAULT_WHELPING_CHECKLIST[0].label)?.done).toBe(true);
  });

  it("sorts merged entries chronologically", () => {
    const result = mergeWhelpingChecklist([], DEFAULT_WHELPING_CHECKLIST, "2024-06-15T00:00:00.000Z");

    const dates = result.map((entry) => entry.date);
    const sortedDates = [...dates].sort((a, b) => a.localeCompare(b));

    expect(dates).toEqual(sortedDates);
  });
});
