// src/lib/financeStats.ts

import type { Expense } from "../types/models/expense";
import type { Income } from "../types/models/income";

export interface MonthlyTotal {
  key: string;
  label: string;
  income: number;
  expense: number;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function computeMonthlyTotals(
  expenses: Expense[],
  incomes: Income[],
  monthsCount = 6,
  now = new Date(),
): MonthlyTotal[] {
  const months: MonthlyTotal[] = [];

  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    months.push({
      key: monthKey(d),
      label: d.toLocaleDateString("fr-FR", { month: "short" }),
      income: 0,
      expense: 0,
    });
  }

  const byKey = new Map(months.map((m) => [m.key, m]));

  for (const income of incomes) {
    const bucket = byKey.get(monthKey(new Date(income.incomeDate)));

    if (bucket) bucket.income += income.amount;
  }

  for (const expense of expenses) {
    const bucket = byKey.get(monthKey(new Date(expense.expenseDate)));

    if (bucket) bucket.expense += expense.amount;
  }

  return months;
}

export interface CategoryTotal {
  category: string;
  amount: number;
}

const MAX_CATEGORIES = 8;

export function computeExpensesByCategory(expenses: Expense[]): CategoryTotal[] {
  const totals = new Map<string, number>();

  for (const expense of expenses) {
    totals.set(
      expense.category,
      (totals.get(expense.category) ?? 0) + expense.amount,
    );
  }

  const sorted = [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  if (sorted.length <= MAX_CATEGORIES) return sorted;

  const head = sorted.slice(0, MAX_CATEGORIES - 1);
  const tailTotal = sorted
    .slice(MAX_CATEGORIES - 1)
    .reduce((sum, entry) => sum + entry.amount, 0);

  return [...head, { category: "Autres", amount: tailTotal }];
}
