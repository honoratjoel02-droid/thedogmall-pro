// src/types/models/income.ts

export type IncomeCategory =
  | "Vente de chiot"
  | "Saillie"
  | "Autre";

export interface Income {
  id: string;

  title: string;

  amount: number;

  category: IncomeCategory;

  incomeDate: string;

  dogId?: string;

  litterId?: string;

  description?: string;

  createdAt: string;

  updatedAt: string;
}
