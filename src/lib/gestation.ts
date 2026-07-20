export const GESTATION_DURATION = 63;

function normalizeProgress(value: number): number {
  return Math.min(Math.max(value, 0), 100);
}

export function gestationDay(breedingDate: string): number {
  const start = new Date(breedingDate);
  const today = new Date();

  const diff = today.getTime() - start.getTime();

  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function gestationProgress(breedingDate: string): number {
  return normalizeProgress(
    (gestationDay(breedingDate) / GESTATION_DURATION) * 100,
  );
}

export function remainingGestationDays(breedingDate: string): number {
  return Math.max(0, GESTATION_DURATION - gestationDay(breedingDate));
}

export function expectedBirthDate(breedingDate: string): Date {
  const date = new Date(breedingDate);

  date.setDate(date.getDate() + GESTATION_DURATION);

  return date;
}
