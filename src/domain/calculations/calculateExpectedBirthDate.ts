// src/domain/calculations/calculateExpectedBirthDate.ts

export function calculateExpectedBirthDate(
  breedingDate: string,
  gestationDays = 63,
): Date {
  const date = new Date(breedingDate);

  date.setDate(date.getDate() + gestationDays);

  return date;
}
