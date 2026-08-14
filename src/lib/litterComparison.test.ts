import { describe, it, expect } from "vitest";

import { computeLitterMetrics } from "./litterComparison";
import type { Litter } from "../types/models/litter";
import type { Puppy } from "../types/models/puppy";
import type { Expense } from "../types/models/expense";
import type { Income } from "../types/models/income";

function makeLitter(id: string): Litter {
  return {
    id,
    pregnancyId: `preg-${id}`,
    femaleId: "f1",
    maleId: "m1",
    birthDate: "2026-01-01",
    puppiesCount: 0,
    malesCount: 0,
    femalesCount: 0,
    createdAt: "",
    updatedAt: "",
  };
}

function makePuppy(overrides: Partial<Puppy> & { litterId: string }): Puppy {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    litterId: overrides.litterId,
    identifier: overrides.identifier ?? "P1",
    sex: overrides.sex ?? "Mâle",
    status: overrides.status ?? "Disponible",
    weightHistory: overrides.weightHistory ?? [],
    vaccinations: overrides.vaccinations ?? [],
    dewormings: overrides.dewormings ?? [],
    socialization: overrides.socialization ?? [],
    birthWeightGrams: overrides.birthWeightGrams,
    reservedForClientId: overrides.reservedForClientId,
    notes: overrides.notes,
    createdAt: "",
    updatedAt: "",
  };
}

function makeExpense(litterId: string, amount: number): Expense {
  return {
    id: crypto.randomUUID(),
    title: "Dépense",
    amount,
    category: "Autre",
    expenseDate: "2026-01-01",
    litterId,
    createdAt: "",
    updatedAt: "",
  };
}

function makeIncome(litterId: string, amount: number): Income {
  return {
    id: crypto.randomUUID(),
    title: "Recette",
    amount,
    category: "Vente de chiot",
    incomeDate: "2026-01-01",
    litterId,
    createdAt: "",
    updatedAt: "",
  };
}

describe("computeLitterMetrics", () => {
  it("aggregates counts, weights, and finances for a litter", () => {
    const litter = makeLitter("l1");

    const puppies = [
      makePuppy({
        litterId: "l1",
        sex: "Mâle",
        status: "Vendu",
        birthWeightGrams: 300,
        weightHistory: [{ date: "2026-02-01", weightGrams: 2000 }],
      }),
      makePuppy({
        litterId: "l1",
        sex: "Femelle",
        status: "Disponible",
        birthWeightGrams: 280,
      }),
      makePuppy({ litterId: "l2", sex: "Mâle", status: "Disponible" }),
    ];

    const expenses = [makeExpense("l1", 100), makeExpense("l2", 999)];
    const incomes = [makeIncome("l1", 500)];

    const result = computeLitterMetrics(litter, puppies, expenses, incomes);

    expect(result.puppiesCount).toBe(2);
    expect(result.malesCount).toBe(1);
    expect(result.femalesCount).toBe(1);
    expect(result.availableCount).toBe(1);
    expect(result.soldCount).toBe(1);
    expect(result.avgBirthWeightGrams).toBe(290);
    expect(result.avgCurrentWeightGrams).toBe(1140);
    expect(result.totalIncome).toBe(500);
    expect(result.totalExpense).toBe(100);
    expect(result.profit).toBe(400);
  });

  it("returns null averages when no weight data is available", () => {
    const litter = makeLitter("l1");
    const puppies = [makePuppy({ litterId: "l1" })];

    const result = computeLitterMetrics(litter, puppies, [], []);

    expect(result.avgBirthWeightGrams).toBeNull();
    expect(result.avgCurrentWeightGrams).toBeNull();
    expect(result.totalIncome).toBe(0);
    expect(result.totalExpense).toBe(0);
    expect(result.profit).toBe(0);
  });
});
