import { describe, expect, it } from "vitest";

import { computeAnnualProgress } from "./annualProgress";
import type { Litter } from "../types/models/litter";
import type { Income } from "../types/models/income";
import type { Sale } from "../types/models/sale";

function makeLitter(id: string, birthDate: string): Litter {
  return {
    id,
    pregnancyId: `preg-${id}`,
    femaleId: "f1",
    maleId: "m1",
    birthDate,
    puppiesCount: 0,
    malesCount: 0,
    femalesCount: 0,
    createdAt: "",
    updatedAt: "",
  };
}

function makeIncome(incomeDate: string, amount: number): Income {
  return {
    id: crypto.randomUUID(),
    title: "Recette",
    amount,
    category: "Vente de chiot",
    incomeDate,
    createdAt: "",
    updatedAt: "",
  };
}

function makeSale(saleDate: string): Sale {
  return {
    id: crypto.randomUUID(),
    puppyId: "p1",
    clientId: "c1",
    litterId: "l1",
    price: 100,
    saleDate,
    contractSigned: false,
    payments: [],
    createdAt: "",
    updatedAt: "",
  };
}

describe("computeAnnualProgress", () => {
  it("only counts records that fall within the given year", () => {
    const litters = [
      makeLitter("a", "2026-03-01"),
      makeLitter("b", "2025-12-01"),
      makeLitter("c", "2026-11-01"),
    ];

    const incomes = [
      makeIncome("2026-01-15", 500),
      makeIncome("2026-06-01", 300),
      makeIncome("2025-06-01", 999),
    ];

    const sales = [makeSale("2026-02-01"), makeSale("2027-01-01")];

    const result = computeAnnualProgress(2026, litters, incomes, sales);

    expect(result.littersCount).toBe(2);
    expect(result.revenue).toBe(800);
    expect(result.reservationsCount).toBe(1);
  });

  it("returns zeros when nothing matches the year", () => {
    const result = computeAnnualProgress(2030, [], [], []);

    expect(result).toEqual({ littersCount: 0, revenue: 0, reservationsCount: 0 });
  });
});
