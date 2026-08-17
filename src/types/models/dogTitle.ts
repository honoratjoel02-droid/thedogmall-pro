// src/types/models/dogTitle.ts

export type DogTitleCategory =
  | "Titre"
  | "Résultat d'exposition"
  | "Autre récompense";

export interface DogTitle {
  id: string;

  dogId: string;

  name: string;

  category: DogTitleCategory;

  eventDate: string;

  organization?: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
