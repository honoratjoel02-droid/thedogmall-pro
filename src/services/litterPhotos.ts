// src/services/litterPhotos.ts

import type { LitterPhoto } from "../types/models/litterPhoto";

const STORAGE_KEY = "thedogmall.litterPhotos";

class LitterPhotosService {
  private photos: LitterPhoto[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.photos = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.photos));
  }

  async getAll(): Promise<LitterPhoto[]> {
    return [...this.photos];
  }

  async getByLitterId(litterId: string): Promise<LitterPhoto[]> {
    return this.photos.filter((photo) => photo.litterId === litterId);
  }

  async create(
    photo: Omit<LitterPhoto, "id" | "createdAt">,
  ): Promise<LitterPhoto> {
    const newPhoto: LitterPhoto = {
      ...photo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.photos.push(newPhoto);

    this.save();

    return newPhoto;
  }

  async delete(id: string): Promise<void> {
    this.photos = this.photos.filter((photo) => photo.id !== id);

    this.save();
  }
}

export const litterPhotosService = new LitterPhotosService();
