import type { CareEntry } from "../types/models/puppy";

export interface WhelpingChecklistItem {
  id: string;
  label: string;
  daysBeforeDue: number;
}

export const DEFAULT_WHELPING_CHECKLIST: WhelpingChecklistItem[] = [
  {
    id: "vet-contact",
    label: "Confirmer les coordonnées du vétérinaire de garde",
    daysBeforeDue: 14,
  },
  {
    id: "whelping-box",
    label: "Installer la caisse de mise bas dans un lieu calme",
    daysBeforeDue: 10,
  },
  {
    id: "whelping-kit",
    label: "Préparer le kit de mise bas (gants, fil, ciseaux, aspirateur nasal)",
    daysBeforeDue: 7,
  },
  {
    id: "towels",
    label: "Préparer des serviettes et draps propres",
    daysBeforeDue: 7,
  },
  {
    id: "scale",
    label: "Prévoir une balance pour peser les chiots",
    daysBeforeDue: 7,
  },
  {
    id: "heat-source",
    label: "Installer une source de chaleur (lampe, tapis chauffant)",
    daysBeforeDue: 5,
  },
  {
    id: "temperature",
    label: "Commencer le suivi quotidien de la température rectale",
    daysBeforeDue: 3,
  },
  {
    id: "emergency-plan",
    label: "Vérifier le plan d'urgence (clinique ouverte 24h/24)",
    daysBeforeDue: 2,
  },
];

export function computeChecklistDate(
  expectedBirthDate: string,
  daysBeforeDue: number,
): string {
  const date = new Date(expectedBirthDate);

  date.setDate(date.getDate() - daysBeforeDue);

  return date.toISOString();
}

export function mergeWhelpingChecklist(
  existing: CareEntry[],
  items: WhelpingChecklistItem[],
  expectedBirthDate: string,
): CareEntry[] {
  const existingLabels = new Set(existing.map((entry) => entry.label));

  const additions: CareEntry[] = items
    .filter((item) => !existingLabels.has(item.label))
    .map((item) => ({
      id: crypto.randomUUID(),
      label: item.label,
      date: computeChecklistDate(expectedBirthDate, item.daysBeforeDue),
      done: false,
    }));

  return [...existing, ...additions].sort((a, b) => a.date.localeCompare(b.date));
}
