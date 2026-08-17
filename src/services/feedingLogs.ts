// src/services/feedingLogs.ts

import type { FeedingLog } from "../types/models/feedingLog";

const STORAGE_KEY = "thedogmall.feedingLogs";

class FeedingLogsService {
  private logs: FeedingLog[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.logs = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
  }

  async getAll(): Promise<FeedingLog[]> {
    return [...this.logs];
  }

  async getByDogId(dogId: string): Promise<FeedingLog[]> {
    return this.logs.filter((log) => log.dogId === dogId);
  }

  async create(
    log: Omit<FeedingLog, "id" | "createdAt" | "updatedAt">,
  ): Promise<FeedingLog> {
    const now = new Date().toISOString();

    const newLog: FeedingLog = {
      ...log,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.logs.push(newLog);

    this.save();

    return newLog;
  }

  async update(
    id: string,
    data: Partial<FeedingLog>,
  ): Promise<FeedingLog | undefined> {
    const index = this.logs.findIndex((log) => log.id === id);

    if (index === -1) {
      return undefined;
    }

    this.logs[index] = {
      ...this.logs[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.logs[index];
  }

  async delete(id: string): Promise<void> {
    this.logs = this.logs.filter((log) => log.id !== id);

    this.save();
  }
}

export const feedingLogsService = new FeedingLogsService();
