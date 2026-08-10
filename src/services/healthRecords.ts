// src/services/healthRecords.ts

import type { HealthRecord } from "../types/models/healthRecord";

const STORAGE_KEY = "thedogmall.healthRecords";

class HealthRecordsService {
  private records: HealthRecord[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.records = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
  }

  async getAll(): Promise<HealthRecord[]> {
    return [...this.records];
  }

  async getByDogId(dogId: string): Promise<HealthRecord[]> {
    return this.records.filter((record) => record.dogId === dogId);
  }

  async create(
    record: Omit<HealthRecord, "id" | "createdAt" | "updatedAt">,
  ): Promise<HealthRecord> {
    const now = new Date().toISOString();

    const newRecord: HealthRecord = {
      ...record,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.records.push(newRecord);

    this.save();

    return newRecord;
  }

  async update(
    id: string,
    data: Partial<HealthRecord>,
  ): Promise<HealthRecord | undefined> {
    const index = this.records.findIndex((record) => record.id === id);

    if (index === -1) {
      return undefined;
    }

    this.records[index] = {
      ...this.records[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.records[index];
  }

  async delete(id: string): Promise<void> {
    this.records = this.records.filter((record) => record.id !== id);

    this.save();
  }
}

export const healthRecordsService = new HealthRecordsService();
