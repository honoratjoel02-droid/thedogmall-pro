// src/services/kennelNotes.ts

import type { KennelNote } from "../types/models/kennelNote";

const STORAGE_KEY = "thedogmall.kennelNotes";

class KennelNotesService {
  private notes: KennelNote[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.notes = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes));
  }

  async getAll(): Promise<KennelNote[]> {
    return [...this.notes];
  }

  async create(
    note: Omit<KennelNote, "id" | "createdAt" | "updatedAt">,
  ): Promise<KennelNote> {
    const now = new Date().toISOString();

    const newNote: KennelNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.notes.push(newNote);

    this.save();

    return newNote;
  }

  async update(
    id: string,
    data: Partial<KennelNote>,
  ): Promise<KennelNote | undefined> {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return undefined;
    }

    this.notes[index] = {
      ...this.notes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.notes[index];
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);

    this.save();
  }
}

export const kennelNotesService = new KennelNotesService();
