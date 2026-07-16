// src/types/models/breeding.ts

export type BreedingMethod = "Naturelle" | "Insémination";

export type BreedingStatus =
  | "Planifiée"
  | "En cours"
  | "Gestation confirmée"
  | "Échec"
  | "Terminée";

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
