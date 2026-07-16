// src/types/models/dog.ts

export type DogSex = "Mâle" | "Femelle";

export type DogStatus = "Disponible" | "Réservé" | "Gestante" | "Retraité";

export interface DogIdentity {
  name: string;
  breed: string;
  sex: DogSex;
  color: string;
  birthDate: string;

  microchip?: string;
  tattoo?: string;

  registrationNumber?: string;
}

export interface DogHealth {
  weight: number;

  bodyConditionScore?: number;

  bloodType?: string;

  allergies?: string[];

  notes?: string;
}

export interface DogReproduction {
  breeder: boolean;

  fertile: boolean;
}

export interface DogFinance {
  purchasePrice?: number;

  currentValue?: number;
}

export interface DogMedia {
  profilePhoto?: string;

  gallery: string[];
}

export interface Dog {
  id: string;

  identity: DogIdentity;

  health: DogHealth;

  reproduction: DogReproduction;

  finance: DogFinance;

  media: DogMedia;

  status: DogStatus;

  createdAt: string;

  updatedAt: string;
}
