// src/types/models/healthRecord.ts

export type HealthRecordType =
  | "Vaccination"
  | "Vermifuge"
  | "Traitement"
  | "Consultation vétérinaire"
  | "Pesée"
  | "Autre";

export interface HealthRecord {
  id: string;

  dogId: string;

  type: HealthRecordType;

  title: string;

  date: string;

  weightKg?: number;

  done: boolean;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
