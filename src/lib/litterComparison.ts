// src/lib/litterComparison.ts

import type { Litter } from "../types/models/litter";
import type { Puppy } from "../types/models/puppy";
import type { Expense } from "../types/models/expense";
import type { Income } from "../types/models/income";

export interface LitterMetrics {
  puppiesCount: number;
  malesCount: number;
  femalesCount: number;
  availableCount: number;
  reservedCount: number;
  soldCount: number;
  keptCount: number;
  avgBirthWeightGrams: number | null;
  avgCurrentWeightGrams: number | null;
  totalIncome: number;
  totalExpense: number;
  profit: number;
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;

  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

export function computeLitterMetrics(
  litter: Litter,
  puppies: Puppy[],
  expenses: Expense[],
  incomes: Income[],
): LitterMetrics {
  const litterPuppies = puppies.filter((p) => p.litterId === litter.id);
  const litterExpenses = expenses.filter((e) => e.litterId === litter.id);
  const litterIncomes = incomes.filter((i) => i.litterId === litter.id);

  const birthWeights = litterPuppies
    .map((p) => p.birthWeightGrams)
    .filter((w): w is number => typeof w === "number");

  const currentWeights = litterPuppies
    .map((p) =>
      p.weightHistory.length > 0
        ? p.weightHistory[p.weightHistory.length - 1].weightGrams
        : p.birthWeightGrams,
    )
    .filter((w): w is number => typeof w === "number");

  const totalIncome = litterIncomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = litterExpenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    puppiesCount: litterPuppies.length,
    malesCount: litterPuppies.filter((p) => p.sex === "Mâle").length,
    femalesCount: litterPuppies.filter((p) => p.sex === "Femelle").length,
    availableCount: litterPuppies.filter((p) => p.status === "Disponible").length,
    reservedCount: litterPuppies.filter((p) => p.status === "Réservé").length,
    soldCount: litterPuppies.filter((p) => p.status === "Vendu").length,
    keptCount: litterPuppies.filter((p) => p.status === "Conservé").length,
    avgBirthWeightGrams: average(birthWeights),
    avgCurrentWeightGrams: average(currentWeights),
    totalIncome,
    totalExpense,
    profit: totalIncome - totalExpense,
  };
}
