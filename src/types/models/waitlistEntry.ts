// src/types/models/waitlistEntry.ts

export type WaitlistStatus = "En attente" | "Converti" | "Annulé";

export interface WaitlistEntry {
  id: string;

  litterId: string;

  clientId: string;

  position: number;

  status: WaitlistStatus;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
