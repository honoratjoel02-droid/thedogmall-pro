// src/services/geneticTests.ts

import type { GeneticTest } from "../types/models/geneticTest";

const STORAGE_KEY = "thedogmall.geneticTests";

class GeneticTestsService {
  private tests: GeneticTest[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.tests = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tests));
  }

  async getAll(): Promise<GeneticTest[]> {
    return [...this.tests];
  }

  async getByDogId(dogId: string): Promise<GeneticTest[]> {
    return this.tests.filter((test) => test.dogId === dogId);
  }

  async create(
    test: Omit<GeneticTest, "id" | "createdAt" | "updatedAt">,
  ): Promise<GeneticTest> {
    const now = new Date().toISOString();

    const newTest: GeneticTest = {
      ...test,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.tests.push(newTest);

    this.save();

    return newTest;
  }

  async update(
    id: string,
    data: Partial<GeneticTest>,
  ): Promise<GeneticTest | undefined> {
    const index = this.tests.findIndex((test) => test.id === id);

    if (index === -1) {
      return undefined;
    }

    this.tests[index] = {
      ...this.tests[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.tests[index];
  }

  async delete(id: string): Promise<void> {
    this.tests = this.tests.filter((test) => test.id !== id);

    this.save();
  }
}

export const geneticTestsService = new GeneticTestsService();
