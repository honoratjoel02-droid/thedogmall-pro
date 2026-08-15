// src/services/annualGoals.ts

import type { AnnualGoal } from "../types/models/annualGoal";

const STORAGE_KEY = "thedogmall.annualGoals";

class AnnualGoalsService {
  private goals: AnnualGoal[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.goals = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.goals));
  }

  async getAll(): Promise<AnnualGoal[]> {
    return [...this.goals];
  }

  async create(
    goal: Omit<AnnualGoal, "id" | "createdAt" | "updatedAt">,
  ): Promise<AnnualGoal> {
    const now = new Date().toISOString();

    const newGoal: AnnualGoal = {
      ...goal,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.goals.push(newGoal);

    this.save();

    return newGoal;
  }

  async update(
    id: string,
    data: Partial<AnnualGoal>,
  ): Promise<AnnualGoal | undefined> {
    const index = this.goals.findIndex((goal) => goal.id === id);

    if (index === -1) {
      return undefined;
    }

    this.goals[index] = {
      ...this.goals[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.goals[index];
  }

  async delete(id: string): Promise<void> {
    this.goals = this.goals.filter((goal) => goal.id !== id);

    this.save();
  }
}

export const annualGoalsService = new AnnualGoalsService();
