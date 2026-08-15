// src/types/models/renewalReminder.ts

export type RenewalReminderType =
  | "Assurance"
  | "Licence / Enregistrement"
  | "Puce / Identification"
  | "Vaccin antirabique"
  | "Autre";

export interface RenewalReminder {
  id: string;

  dogId: string;

  type: RenewalReminderType;

  label: string;

  dueDate: string;

  recurrenceMonths?: number;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
