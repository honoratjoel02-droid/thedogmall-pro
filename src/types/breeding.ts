export type BreedingMethod = "Naturelle" | "Insémination";

export type PregnancyStatus =
  | "En attente"
  | "Confirmée"
  | "Non gestante"
  | "Mise bas"
  | "Terminée";

export interface Breeding {
  id: string;

  femaleId: string;
  maleId: string;

  /**
   * Plusieurs saillies possibles
   */
  breedingDates: string[];

  method: BreedingMethod;

  pregnancyStatus: PregnancyStatus;

  /**
   * Facultatif
   */
  ovulationDate?: string;

  /**
   * ng/mL
   */
  progesterone?: number;

  /**
   * Confirmation échographie
   */
  confirmationDate?: string;

  /**
   * Date réelle de mise bas
   */
  birthDate?: string;

  /**
   * Nombre de chiots
   */
  puppiesCount?: number;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}
