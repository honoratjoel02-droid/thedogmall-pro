// src/lib/gestation.ts

const GESTATION_DURATION = 63;

function normalize(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function expectedBirthDate(breedingDate: string): string {
  const date = new Date(breedingDate);

  date.setDate(date.getDate() + GESTATION_DURATION);

  return date.toISOString().split("T")[0];
}

export function gestationDay(breedingDate: string): number {
  const start = normalize(new Date(breedingDate));
  const today = normalize(new Date());

  const diff = today.getTime() - start.getTime();

  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)) + 1);
}

export function remainingGestationDays(breedingDate: string): number {
  return Math.max(0, GESTATION_DURATION - gestationDay(breedingDate));
}

export function gestationProgress(breedingDate: string): number {
  const progress = (gestationDay(breedingDate) / GESTATION_DURATION) * 100;

  return Math.min(progress, 100);
}

export function isNearBirth(breedingDate: string): boolean {
  return remainingGestationDays(breedingDate) <= 7;
}

export function isLate(breedingDate: string): boolean {
  return gestationDay(breedingDate) > GESTATION_DURATION;
}

export function gestationStatus(
  breedingDate: string,
): "early" | "middle" | "late" | "due" | "overdue" {
  const day = gestationDay(breedingDate);

  if (day > GESTATION_DURATION) return "overdue";

  if (day >= 63) return "due";

  if (day >= 50) return "late";

  if (day >= 22) return "middle";

  return "early";
}

export { GESTATION_DURATION };
