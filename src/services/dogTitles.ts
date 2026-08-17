// src/services/dogTitles.ts

import type { DogTitle } from "../types/models/dogTitle";

const STORAGE_KEY = "thedogmall.dogTitles";

class DogTitlesService {
  private titles: DogTitle[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.titles = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.titles));
  }

  async getAll(): Promise<DogTitle[]> {
    return [...this.titles];
  }

  async getByDogId(dogId: string): Promise<DogTitle[]> {
    return this.titles.filter((title) => title.dogId === dogId);
  }

  async create(
    title: Omit<DogTitle, "id" | "createdAt" | "updatedAt">,
  ): Promise<DogTitle> {
    const now = new Date().toISOString();

    const newTitle: DogTitle = {
      ...title,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.titles.push(newTitle);

    this.save();

    return newTitle;
  }

  async update(
    id: string,
    data: Partial<DogTitle>,
  ): Promise<DogTitle | undefined> {
    const index = this.titles.findIndex((title) => title.id === id);

    if (index === -1) {
      return undefined;
    }

    this.titles[index] = {
      ...this.titles[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.titles[index];
  }

  async delete(id: string): Promise<void> {
    this.titles = this.titles.filter((title) => title.id !== id);

    this.save();
  }
}

export const dogTitlesService = new DogTitlesService();
