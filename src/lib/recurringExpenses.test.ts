import { describe, it, expect } from "vitest";

import { advanceRecurringDate } from "./recurringExpenses";

describe("advanceRecurringDate", () => {
  it("advances by one month for Mensuel", () => {
    const result = advanceRecurringDate("2026-01-15T00:00:00.000Z", "Mensuel");

    expect(result.slice(0, 10)).toBe("2026-02-15");
  });

  it("advances by three months for Trimestriel", () => {
    const result = advanceRecurringDate(
      "2026-01-15T00:00:00.000Z",
      "Trimestriel",
    );

    expect(result.slice(0, 10)).toBe("2026-04-15");
  });

  it("advances by twelve months for Annuel", () => {
    const result = advanceRecurringDate("2026-01-15T00:00:00.000Z", "Annuel");

    expect(result.slice(0, 10)).toBe("2027-01-15");
  });
});
