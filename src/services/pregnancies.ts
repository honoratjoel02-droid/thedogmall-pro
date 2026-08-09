// src/services/pregnancies.ts

import type { Pregnancy } from "../types/models/pregnancy";

const STORAGE_KEY = "thedogmall.pregnancies";

class PregnanciesService {
  private pregnancies: Pregnancy[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.pregnancies = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pregnancies));
  }

  async getAll(): Promise<Pregnancy[]> {
    return [...this.pregnancies];
  }

  async getById(id: string): Promise<Pregnancy | undefined> {
    return this.pregnancies.find((pregnancy) => pregnancy.id === id);
  }

  async getByBreedingId(breedingId: string): Promise<Pregnancy | undefined> {
    return this.pregnancies.find(
      (pregnancy) => pregnancy.breedingId === breedingId,
    );
  }

  async create(
    pregnancy: Omit<Pregnancy, "id" | "createdAt" | "updatedAt">,
  ): Promise<Pregnancy> {
    const now = new Date().toISOString();

    const newPregnancy: Pregnancy = {
      ...pregnancy,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.pregnancies.push(newPregnancy);

    this.save();

    return newPregnancy;
  }

  async update(
    id: string,
    data: Partial<Pregnancy>,
  ): Promise<Pregnancy | undefined> {
    const index = this.pregnancies.findIndex(
      (pregnancy) => pregnancy.id === id,
    );

    if (index === -1) {
      return undefined;
    }

    this.pregnancies[index] = {
      ...this.pregnancies[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.pregnancies[index];
  }

  async delete(id: string): Promise<void> {
    this.pregnancies = this.pregnancies.filter(
      (pregnancy) => pregnancy.id !== id,
    );

    this.save();
  }
}

export const pregnanciesService = new PregnanciesService();
