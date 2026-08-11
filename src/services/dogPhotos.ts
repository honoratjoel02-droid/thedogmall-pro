// src/services/dogPhotos.ts

import type { DogPhoto } from "../types/models/dogPhoto";

const STORAGE_KEY = "thedogmall.dogPhotos";

class DogPhotosService {
  private photos: DogPhoto[] = [];

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

  async getAll(): Promise<DogPhoto[]> {
    return [...this.photos];
  }

  async getByDogId(dogId: string): Promise<DogPhoto[]> {
    return this.photos.filter((photo) => photo.dogId === dogId);
  }

  async create(
    photo: Omit<DogPhoto, "id" | "createdAt">,
  ): Promise<DogPhoto> {
    const newPhoto: DogPhoto = {
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

export const dogPhotosService = new DogPhotosService();
