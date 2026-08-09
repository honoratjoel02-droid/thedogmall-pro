// src/services/puppies.ts

import type { Puppy } from "../types/models/puppy";

const STORAGE_KEY = "thedogmall.puppies";

class PuppiesService {
  private puppies: Puppy[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.puppies = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.puppies));
  }

  async getAll(): Promise<Puppy[]> {
    return [...this.puppies];
  }

  async getById(id: string): Promise<Puppy | undefined> {
    return this.puppies.find((puppy) => puppy.id === id);
  }

  async getByLitterId(litterId: string): Promise<Puppy[]> {
    return this.puppies.filter((puppy) => puppy.litterId === litterId);
  }

  async create(
    puppy: Omit<Puppy, "id" | "createdAt" | "updatedAt">,
  ): Promise<Puppy> {
    const now = new Date().toISOString();

    const newPuppy: Puppy = {
      ...puppy,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.puppies.push(newPuppy);

    this.save();

    return newPuppy;
  }

  async update(id: string, data: Partial<Puppy>): Promise<Puppy | undefined> {
    const index = this.puppies.findIndex((puppy) => puppy.id === id);

    if (index === -1) {
      return undefined;
    }

    this.puppies[index] = {
      ...this.puppies[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.puppies[index];
  }

  async delete(id: string): Promise<void> {
    this.puppies = this.puppies.filter((puppy) => puppy.id !== id);

    this.save();
  }
}

export const puppiesService = new PuppiesService();
