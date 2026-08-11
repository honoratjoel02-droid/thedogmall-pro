// src/services/dogDocuments.ts

import type { DogDocument } from "../types/models/dogDocument";

const STORAGE_KEY = "thedogmall.dogDocuments";

class DogDocumentsService {
  private documents: DogDocument[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.documents = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.documents));
  }

  async getAll(): Promise<DogDocument[]> {
    return [...this.documents];
  }

  async getByDogId(dogId: string): Promise<DogDocument[]> {
    return this.documents.filter((doc) => doc.dogId === dogId);
  }

  async create(
    doc: Omit<DogDocument, "id" | "createdAt">,
  ): Promise<DogDocument> {
    const newDoc: DogDocument = {
      ...doc,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.documents.push(newDoc);

    this.save();

    return newDoc;
  }

  async delete(id: string): Promise<void> {
    this.documents = this.documents.filter((doc) => doc.id !== id);

    this.save();
  }
}

export const dogDocumentsService = new DogDocumentsService();
