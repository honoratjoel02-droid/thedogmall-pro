// src/domain/calculations/calculateUltrasoundDate.ts

export function calculateUltrasoundDate(
  breedingDate: string,
  daysAfterBreeding = 25,
): Date {
  const date = new Date(breedingDate);

  date.setDate(date.getDate() + daysAfterBreeding);

  return date;
}
