// src/domain/calculations/calculateXRayDate.ts

export function calculateXRayDate(
  breedingDate: string,
  daysAfterBreeding = 52,
): Date {
  const date = new Date(breedingDate);

  date.setDate(date.getDate() + daysAfterBreeding);

  return date;
}
