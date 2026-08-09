// src/services/litters.ts

import type { Litter } from "../types/models/litter";

const STORAGE_KEY = "thedogmall.litters";

class LittersService {
  private litters: Litter[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.litters = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.litters));
  }

  async getAll(): Promise<Litter[]> {
    return [...this.litters];
  }

  async getById(id: string): Promise<Litter | undefined> {
    return this.litters.find((litter) => litter.id === id);
  }

  async getByPregnancyId(pregnancyId: string): Promise<Litter | undefined> {
    return this.litters.find((litter) => litter.pregnancyId === pregnancyId);
  }

  async create(
    litter: Omit<Litter, "id" | "createdAt" | "updatedAt">,
  ): Promise<Litter> {
    const now = new Date().toISOString();

    const newLitter: Litter = {
      ...litter,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.litters.push(newLitter);

    this.save();

    return newLitter;
  }

  async update(id: string, data: Partial<Litter>): Promise<Litter | undefined> {
    const index = this.litters.findIndex((litter) => litter.id === id);

    if (index === -1) {
      return undefined;
    }

    this.litters[index] = {
      ...this.litters[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.litters[index];
  }

  async delete(id: string): Promise<void> {
    this.litters = this.litters.filter((litter) => litter.id !== id);

    this.save();
  }
}

export const littersService = new LittersService();
