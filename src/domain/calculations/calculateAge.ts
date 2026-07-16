// src/domain/calculations/calculateAge.ts

export interface AgeResult {
  years: number;
  months: number;
  days: number;
}

export function calculateAge(
  birthDate: string,
  referenceDate: Date = new Date(),
): AgeResult {
  const birth = new Date(birthDate);

  let years = referenceDate.getFullYear() - birth.getFullYear();

  let months = referenceDate.getMonth() - birth.getMonth();

  let days = referenceDate.getDate() - birth.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      0,
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
  };
}
