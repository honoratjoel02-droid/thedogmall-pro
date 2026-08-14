// src/types/models/clientInteraction.ts

export type InteractionType = "Appel" | "Message" | "Visite" | "Email" | "Autre";

export interface ClientInteraction {
  id: string;

  clientId: string;

  type: InteractionType;

  date: string;

  summary: string;

  createdAt: string;

  updatedAt: string;
}
