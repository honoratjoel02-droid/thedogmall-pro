// src/services/breedings.ts

import type { Breeding } from "../types/models/breeding";

const breedings: Breeding[] = [];

export const breedingService = {
  getAll(): Breeding[] {
    return breedings;
  },

  getById(id: string): Breeding | undefined {
    return breedings.find((breeding) => breeding.id === id);
  },

  create(breeding: Omit<Breeding, "id" | "createdAt" | "updatedAt">): Breeding {
    const newBreeding: Breeding = {
      ...breeding,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    breedings.push(newBreeding);

    return newBreeding;
  },

  update(id: string, data: Partial<Breeding>): Breeding | undefined {
    const breeding = breedings.find((item) => item.id === id);

    if (!breeding) {
      return undefined;
    }

    Object.assign(breeding, data, {
      updatedAt: new Date().toISOString(),
    });

    return breeding;
  },

  delete(id: string): boolean {
    const index = breedings.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    breedings.splice(index, 1);

    return true;
  },
};
