// src/types/models/expense.ts

export type ExpenseCategory =
  | "Alimentation"
  | "Vétérinaire"
  | "Vaccination"
  | "Vermifuge"
  | "Toilettage"
  | "Saillie"
  | "Transport"
  | "Matériel"
  | "Exposition"
  | "Administration"
  | "Autre";

export interface Expense {
  id: string;

  title: string;

  amount: number;

  category: ExpenseCategory;

  expenseDate: string;

  dogId?: string;

  litterId?: string;

  breedingId?: string;

  description?: string;

  createdAt: string;

  updatedAt: string;
}
