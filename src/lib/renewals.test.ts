import { describe, it, expect } from "vitest";

import { advanceDueDate } from "./renewals";

describe("advanceDueDate", () => {
  it("advances the due date by the given number of months", () => {
    const result = advanceDueDate("2026-01-15T00:00:00.000Z", 12);

    expect(result.slice(0, 10)).toBe("2027-01-15");
  });

  it("handles multi-year recurrence", () => {
    const result = advanceDueDate("2026-06-01T00:00:00.000Z", 24);

    expect(result.slice(0, 10)).toBe("2028-06-01");
  });

  it("rolls over month boundaries correctly", () => {
    const result = advanceDueDate("2026-11-30T00:00:00.000Z", 3);

    expect(result.slice(0, 10)).toBe("2027-03-02");
  });
});
