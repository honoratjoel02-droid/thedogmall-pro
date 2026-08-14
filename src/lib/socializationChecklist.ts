// src/lib/socializationChecklist.ts

import type { CareEntry } from "../types/models/puppy";

export interface ChecklistItem {
  id: string;
  label: string;
  ageDays: number;
}

export const DEFAULT_SOCIALIZATION_CHECKLIST: ChecklistItem[] = [
  { id: "handling", label: "Manipulation des pattes, oreilles, gueule", ageDays: 21 },
  { id: "sounds", label: "Exposition aux bruits domestiques (aspirateur, sèche-cheveux)", ageDays: 21 },
  { id: "surfaces", label: "Marche sur différentes surfaces (herbe, carrelage, gravier)", ageDays: 28 },
  { id: "collar", label: "Port du collier/harnais", ageDays: 35 },
  { id: "people", label: "Rencontre avec des inconnus (adultes et enfants)", ageDays: 35 },
  { id: "car", label: "Premier trajet en voiture", ageDays: 42 },
  { id: "dogs", label: "Rencontre avec d'autres chiens vaccinés", ageDays: 42 },
  { id: "alone", label: "Courtes périodes de solitude", ageDays: 49 },
];

export function computeChecklistDate(birthDate: string, ageDays: number): string {
  const date = new Date(birthDate);

  date.setDate(date.getDate() + ageDays);

  return date.toISOString();
}

export function mergeChecklistEntries(
  existing: CareEntry[],
  items: ChecklistItem[],
  birthDate: string,
): CareEntry[] {
  const existingLabels = new Set(existing.map((entry) => entry.label));

  const additions: CareEntry[] = items
    .filter((item) => !existingLabels.has(item.label))
    .map((item) => ({
      id: crypto.randomUUID(),
      label: item.label,
      date: computeChecklistDate(birthDate, item.ageDays),
      done: false,
    }));

  return [...existing, ...additions].sort((a, b) => a.date.localeCompare(b.date));
}
