// src/services/incomes.ts

import type { Income } from "../types/models/income";

const STORAGE_KEY = "thedogmall.incomes";

class IncomesService {
  private incomes: Income[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.incomes = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.incomes));
  }

  async getAll(): Promise<Income[]> {
    return [...this.incomes];
  }

  async getById(id: string): Promise<Income | undefined> {
    return this.incomes.find((income) => income.id === id);
  }

  async create(
    income: Omit<Income, "id" | "createdAt" | "updatedAt">,
  ): Promise<Income> {
    const now = new Date().toISOString();

    const newIncome: Income = {
      ...income,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.incomes.push(newIncome);

    this.save();

    return newIncome;
  }

  async update(
    id: string,
    data: Partial<Income>,
  ): Promise<Income | undefined> {
    const index = this.incomes.findIndex((income) => income.id === id);

    if (index === -1) {
      return undefined;
    }

    this.incomes[index] = {
      ...this.incomes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.incomes[index];
  }

  async delete(id: string): Promise<void> {
    this.incomes = this.incomes.filter((income) => income.id !== id);

    this.save();
  }
}

export const incomesService = new IncomesService();
