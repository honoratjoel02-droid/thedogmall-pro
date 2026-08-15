// src/lib/annualProgress.ts

import type { Litter } from "../types/models/litter";
import type { Income } from "../types/models/income";
import type { Sale } from "../types/models/sale";

export interface AnnualProgress {
  littersCount: number;
  revenue: number;
  reservationsCount: number;
}

export function computeAnnualProgress(
  year: number,
  litters: Litter[],
  incomes: Income[],
  sales: Sale[],
): AnnualProgress {
  const littersCount = litters.filter(
    (litter) => new Date(litter.birthDate).getFullYear() === year,
  ).length;

  const revenue = incomes
    .filter((income) => new Date(income.incomeDate).getFullYear() === year)
    .reduce((sum, income) => sum + income.amount, 0);

  const reservationsCount = sales.filter(
    (sale) => new Date(sale.saleDate).getFullYear() === year,
  ).length;

  return { littersCount, revenue, reservationsCount };
}
