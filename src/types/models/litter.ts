// src/types/models/litter.ts

export interface Litter {
  id: string;

  pregnancyId: string;

  femaleId: string;

  maleId: string;

  birthDate: string;

  puppiesCount: number;

  malesCount: number;

  femalesCount: number;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
