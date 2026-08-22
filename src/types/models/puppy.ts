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

export interface TemperamentTestItem {
  id: string;

  label: string;

  score: number;
}

export interface TemperamentTest {
  date: string;

  items: TemperamentTestItem[];

  notes?: string;
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

  socialization: CareEntry[];

  temperamentTest?: TemperamentTest;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
