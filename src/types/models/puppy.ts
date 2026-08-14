// src/types/models/puppy.ts

import type { WeightEntry } from "./weightEntry";

export type PuppyStatus = "Disponible" | "Réservé" | "Vendu" | "Conservé";

export type { WeightEntry };

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

  reservedForClientId?: string;

  weightHistory: WeightEntry[];

  vaccinations: CareEntry[];

  dewormings: CareEntry[];

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
