// src/services/breedings.ts

import type { Breeding } from "../types/models/breeding";

const STORAGE_KEY = "thedogmall.breedings";

class BreedingsService {
  private breedings: Breeding[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.breedings = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.breedings));
  }

  async getAll(): Promise<Breeding[]> {
    return [...this.breedings];
  }

  async getById(id: string): Promise<Breeding | undefined> {
    return this.breedings.find((breeding) => breeding.id === id);
  }

  async create(
    breeding: Omit<Breeding, "id" | "createdAt" | "updatedAt">,
  ): Promise<Breeding> {
    const now = new Date().toISOString();

    const newBreeding: Breeding = {
      ...breeding,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.breedings.push(newBreeding);

    this.save();

    return newBreeding;
  }

  async update(id: string, data: Partial<Breeding>): Promise<Breeding | undefined> {
    const index = this.breedings.findIndex((breeding) => breeding.id === id);

    if (index === -1) {
      return undefined;
    }

    this.breedings[index] = {
      ...this.breedings[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.breedings[index];
  }

  async delete(id: string): Promise<void> {
    this.breedings = this.breedings.filter((breeding) => breeding.id !== id);

    this.save();
  }
}

export const breedingService = new BreedingsService();
