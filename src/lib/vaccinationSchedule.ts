// src/lib/vaccinationSchedule.ts

import type { CareEntry } from "../types/models/puppy";

export interface ScheduleItem {
  id: string;
  label: string;
  ageDays: number;
  kind: "vaccination" | "deworming";
}

export const DEFAULT_VACCINATION_SCHEDULE: ScheduleItem[] = [
  { id: "deworm-15", label: "Vermifuge J15", ageDays: 15, kind: "deworming" },
  { id: "deworm-30", label: "Vermifuge J30", ageDays: 30, kind: "deworming" },
  { id: "deworm-45", label: "Vermifuge J45", ageDays: 45, kind: "deworming" },
  { id: "deworm-60", label: "Vermifuge J60", ageDays: 60, kind: "deworming" },
  { id: "vaccine-primo", label: "Primovaccination", ageDays: 56, kind: "vaccination" },
  { id: "vaccine-rappel", label: "Rappel vaccin", ageDays: 84, kind: "vaccination" },
  { id: "vaccine-rage", label: "Vaccin rage", ageDays: 112, kind: "vaccination" },
];

export function computeScheduleDate(birthDate: string, ageDays: number): string {
  const date = new Date(birthDate);

  date.setDate(date.getDate() + ageDays);

  return date.toISOString();
}

export function mergeScheduleEntries(
  existing: CareEntry[],
  items: ScheduleItem[],
  birthDate: string,
): CareEntry[] {
  const existingLabels = new Set(existing.map((entry) => entry.label));

  const additions: CareEntry[] = items
    .filter((item) => !existingLabels.has(item.label))
    .map((item) => ({
      id: crypto.randomUUID(),
      label: item.label,
      date: computeScheduleDate(birthDate, item.ageDays),
      done: false,
    }));

  return [...existing, ...additions].sort((a, b) => a.date.localeCompare(b.date));
}
