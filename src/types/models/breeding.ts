// src/types/models/breeding.ts

export type BreedingMethod = "Naturelle" | "Insémination";

export type BreedingStatus = "Planifiée" | "Réalisée" | "Annulée";

export interface Breeding {
  id: string;

  femaleId: string;

  maleId: string;

  breedingDate: string;

  method: BreedingMethod;

  status: BreedingStatus;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
