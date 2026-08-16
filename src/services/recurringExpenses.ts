// src/services/recurringExpenses.ts

import type { RecurringExpense } from "../types/models/recurringExpense";

const STORAGE_KEY = "thedogmall.recurringExpenses";

class RecurringExpensesService {
  private items: RecurringExpense[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.items = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  async getAll(): Promise<RecurringExpense[]> {
    return [...this.items];
  }

  async create(
    item: Omit<RecurringExpense, "id" | "createdAt" | "updatedAt">,
  ): Promise<RecurringExpense> {
    const now = new Date().toISOString();

    const newItem: RecurringExpense = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.items.push(newItem);

    this.save();

    return newItem;
  }

  async update(
    id: string,
    data: Partial<RecurringExpense>,
  ): Promise<RecurringExpense | undefined> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return undefined;
    }

    this.items[index] = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);

    this.save();
  }
}

export const recurringExpensesService = new RecurringExpensesService();
