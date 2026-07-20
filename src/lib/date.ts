/**
 * Retourne l'âge sous la forme :
 * 3 ans
 * 2 ans 4 mois
 * 8 mois
 */
export function calculateAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (today.getDate() < birth.getDate()) {
    months--;
  }

  if (years <= 0) {
    return `${months} mois`;
  }

  if (months <= 0) {
    return `${years} an${years > 1 ? "s" : ""}`;
  }

  return `${years} an${years > 1 ? "s" : ""} ${months} mois`;
}

/**
 * Formate une date au format français.
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR");
}

/**
 * Nombre de jours écoulés depuis une date.
 */
export function daysSince(date: string): number {
  const start = new Date(date).getTime();
  const now = Date.now();

  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

/**
 * Date prévue de mise bas
 * (63 jours après la saillie)
 */
export function expectedBirthDate(breedingDate: string): Date {
  const result = new Date(breedingDate);

  result.setDate(result.getDate() + 63);

  return result;
}

/**
 * Jour actuel de gestation.
 */
export function gestationDay(breedingDate: string): number {
  return daysSince(breedingDate);
}

/**
 * Nombre de jours restants avant la mise bas.
 */
export function remainingGestationDays(breedingDate: string): number {
  return Math.max(63 - daysSince(breedingDate), 0);
}
