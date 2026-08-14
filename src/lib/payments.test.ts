// src/lib/payments.test.ts

import { describe, expect, it } from "vitest";

import { getBalanceDue, getTotalPaid, isFullyPaid } from "./payments";

describe("payments", () => {
  it("sums payments to zero when none exist", () => {
    expect(getTotalPaid({ payments: [] })).toBe(0);
  });

  it("sums multiple payments", () => {
    const payments = [
      { id: "1", amount: 50000, date: "2026-01-01" },
      { id: "2", amount: 30000, date: "2026-02-01" },
    ];

    expect(getTotalPaid({ payments })).toBe(80000);
  });

  it("computes the remaining balance", () => {
    const sale = {
      price: 200000,
      payments: [{ id: "1", amount: 50000, date: "2026-01-01" }],
    };

    expect(getBalanceDue(sale)).toBe(150000);
  });

  it("never returns a negative balance when overpaid", () => {
    const sale = {
      price: 100000,
      payments: [{ id: "1", amount: 150000, date: "2026-01-01" }],
    };

    expect(getBalanceDue(sale)).toBe(0);
  });

  it("is fully paid once payments reach the price", () => {
    const sale = {
      price: 100000,
      payments: [{ id: "1", amount: 100000, date: "2026-01-01" }],
    };

    expect(isFullyPaid(sale)).toBe(true);
  });

  it("is not fully paid while a balance remains", () => {
    const sale = {
      price: 100000,
      payments: [{ id: "1", amount: 40000, date: "2026-01-01" }],
    };

    expect(isFullyPaid(sale)).toBe(false);
  });
});
