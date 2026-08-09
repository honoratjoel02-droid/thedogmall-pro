// src/types/models/pregnancy.ts

export type PregnancyStatus =
  | "En cours"
  | "Confirmée"
  | "Terminée"
  | "Interrompue";

export interface Pregnancy {
  id: string;

  breedingId: string;

  femaleId: string;

  expectedBirthDate: string;

  ultrasoundDate?: string;

  ultrasoundResult?: string;

  xrayDate?: string;

  xrayResult?: string;

  puppyCountEstimate?: number;

  status: PregnancyStatus;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
