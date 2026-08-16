// src/types/models/recurringExpense.ts

import type { ExpenseCategory } from "./expense";

export type RecurringExpenseFrequency = "Mensuel" | "Trimestriel" | "Annuel";

export interface RecurringExpense {
  id: string;

  title: string;

  amount: number;

  category: ExpenseCategory;

  frequency: RecurringExpenseFrequency;

  nextDueDate: string;

  dogId?: string;

  notes?: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}
