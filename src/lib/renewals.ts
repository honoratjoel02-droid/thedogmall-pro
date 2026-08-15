// src/lib/renewals.ts

import type { RenewalReminderType } from "../types/models/renewalReminder";

export const RENEWAL_TYPES: RenewalReminderType[] = [
  "Assurance",
  "Licence / Enregistrement",
  "Puce / Identification",
  "Vaccin antirabique",
  "Autre",
];

export function advanceDueDate(dueDate: string, recurrenceMonths: number): string {
  const date = new Date(dueDate);

  date.setMonth(date.getMonth() + recurrenceMonths);

  return date.toISOString();
}
