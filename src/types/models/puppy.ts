// src/types/models/puppy.ts

export type PuppyStatus = "Disponible" | "Réservé" | "Vendu" | "Conservé";

export interface WeightEntry {
  date: string;

  weightGrams: number;
}

export interface CareEntry {
  id: string;

  label: string;

  date: string;

  done: boolean;
}

export interface Puppy {
  id: string;

  litterId: string;

  identifier: string;

  sex: "Mâle" | "Femelle";

  color?: string;

  birthWeightGrams?: number;

  status: PuppyStatus;

  reservedFor?: string;

  weightHistory: WeightEntry[];

  vaccinations: CareEntry[];

  dewormings: CareEntry[];

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
