// src/services/expenses.ts

import type { Expense } from "../types/models/expense";

const STORAGE_KEY = "thedogmall.expenses";

class ExpensesService {
  private expenses: Expense[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.expenses = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.expenses));
  }

  async getAll(): Promise<Expense[]> {
    return [...this.expenses];
  }

  async getById(id: string): Promise<Expense | undefined> {
    return this.expenses.find((expense) => expense.id === id);
  }

  async create(
    expense: Omit<Expense, "id" | "createdAt" | "updatedAt">,
  ): Promise<Expense> {
    const now = new Date().toISOString();

    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.expenses.push(newExpense);

    this.save();

    return newExpense;
  }

  async update(
    id: string,
    data: Partial<Expense>,
  ): Promise<Expense | undefined> {
    const index = this.expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return undefined;
    }

    this.expenses[index] = {
      ...this.expenses[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.expenses[index];
  }

  async delete(id: string): Promise<void> {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);

    this.save();
  }
}

export const expensesService = new ExpensesService();
