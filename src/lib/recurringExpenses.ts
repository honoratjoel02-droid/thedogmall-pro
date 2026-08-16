// src/lib/recurringExpenses.ts

import type { RecurringExpenseFrequency } from "../types/models/recurringExpense";

export const FREQUENCIES: RecurringExpenseFrequency[] = [
  "Mensuel",
  "Trimestriel",
  "Annuel",
];

const MONTHS_BY_FREQUENCY: Record<RecurringExpenseFrequency, number> = {
  Mensuel: 1,
  Trimestriel: 3,
  Annuel: 12,
};

export function advanceRecurringDate(
  date: string,
  frequency: RecurringExpenseFrequency,
): string {
  const current = new Date(date);

  return new Date(
    Date.UTC(
      current.getUTCFullYear(),
      current.getUTCMonth() + MONTHS_BY_FREQUENCY[frequency],
      current.getUTCDate(),
      current.getUTCHours(),
      current.getUTCMinutes(),
      current.getUTCSeconds(),
    ),
  ).toISOString();
}
