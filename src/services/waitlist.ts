// src/services/waitlist.ts

import type { WaitlistEntry } from "../types/models/waitlistEntry";

const STORAGE_KEY = "thedogmall.waitlist";

class WaitlistService {
  private entries: WaitlistEntry[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.entries = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
  }

  async getAll(): Promise<WaitlistEntry[]> {
    return [...this.entries];
  }

  async getByLitterId(litterId: string): Promise<WaitlistEntry[]> {
    return this.entries.filter((entry) => entry.litterId === litterId);
  }

  async create(
    entry: Omit<WaitlistEntry, "id" | "createdAt" | "updatedAt">,
  ): Promise<WaitlistEntry> {
    const now = new Date().toISOString();

    const newEntry: WaitlistEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.entries.push(newEntry);

    this.save();

    return newEntry;
  }

  async update(
    id: string,
    data: Partial<WaitlistEntry>,
  ): Promise<WaitlistEntry | undefined> {
    const index = this.entries.findIndex((entry) => entry.id === id);

    if (index === -1) {
      return undefined;
    }

    this.entries[index] = {
      ...this.entries[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.entries[index];
  }

  async delete(id: string): Promise<void> {
    this.entries = this.entries.filter((entry) => entry.id !== id);

    this.save();
  }
}

export const waitlistService = new WaitlistService();
