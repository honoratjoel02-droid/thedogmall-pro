// src/types/models/dogPhoto.ts

export interface DogPhoto {
  id: string;

  dogId: string;

  dataUrl: string;

  caption?: string;

  createdAt: string;
}
