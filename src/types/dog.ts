import type { WeightEntry } from "./models/weightEntry";

export type Dog = {
  id: string;
  name: string;
  sex: "Mâle" | "Femelle";
  breed: string;
  color: string;
  birthDate: string;
  weight: number;
  weightHistory: WeightEntry[];
  status:
    | "Disponible"
    | "Réservé"
    | "Gestante"
    | "Retraité";
  sireId?: string;
  damId?: string;
};