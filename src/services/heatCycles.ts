// src/services/heatCycles.ts

import type { HeatCycle } from "../types/models/heatCycle";

const STORAGE_KEY = "thedogmall.heatCycles";

class HeatCyclesService {
  private cycles: HeatCycle[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.cycles = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cycles));
  }

  async getAll(): Promise<HeatCycle[]> {
    return [...this.cycles];
  }

  async getByDogId(dogId: string): Promise<HeatCycle[]> {
    return this.cycles.filter((cycle) => cycle.dogId === dogId);
  }

  async create(
    cycle: Omit<HeatCycle, "id" | "createdAt" | "updatedAt">,
  ): Promise<HeatCycle> {
    const now = new Date().toISOString();

    const newCycle: HeatCycle = {
      ...cycle,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.cycles.push(newCycle);

    this.save();

    return newCycle;
  }

  async update(
    id: string,
    data: Partial<HeatCycle>,
  ): Promise<HeatCycle | undefined> {
    const index = this.cycles.findIndex((cycle) => cycle.id === id);

    if (index === -1) {
      return undefined;
    }

    this.cycles[index] = {
      ...this.cycles[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.cycles[index];
  }

  async delete(id: string): Promise<void> {
    this.cycles = this.cycles.filter((cycle) => cycle.id !== id);

    this.save();
  }
}

export const heatCyclesService = new HeatCyclesService();
