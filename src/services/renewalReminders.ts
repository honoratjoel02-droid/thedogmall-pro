// src/services/renewalReminders.ts

import type { RenewalReminder } from "../types/models/renewalReminder";

const STORAGE_KEY = "thedogmall.renewalReminders";

class RenewalRemindersService {
  private reminders: RenewalReminder[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.reminders = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reminders));
  }

  async getAll(): Promise<RenewalReminder[]> {
    return [...this.reminders];
  }

  async getByDogId(dogId: string): Promise<RenewalReminder[]> {
    return this.reminders.filter((reminder) => reminder.dogId === dogId);
  }

  async create(
    reminder: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">,
  ): Promise<RenewalReminder> {
    const now = new Date().toISOString();

    const newReminder: RenewalReminder = {
      ...reminder,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.reminders.push(newReminder);

    this.save();

    return newReminder;
  }

  async update(
    id: string,
    data: Partial<RenewalReminder>,
  ): Promise<RenewalReminder | undefined> {
    const index = this.reminders.findIndex((reminder) => reminder.id === id);

    if (index === -1) {
      return undefined;
    }

    this.reminders[index] = {
      ...this.reminders[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.reminders[index];
  }

  async delete(id: string): Promise<void> {
    this.reminders = this.reminders.filter((reminder) => reminder.id !== id);

    this.save();
  }
}

export const renewalRemindersService = new RenewalRemindersService();
