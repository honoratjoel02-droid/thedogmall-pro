// src/services/clientInteractions.ts

import type { ClientInteraction } from "../types/models/clientInteraction";

const STORAGE_KEY = "thedogmall.clientInteractions";

class ClientInteractionsService {
  private interactions: ClientInteraction[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.interactions = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.interactions));
  }

  async getAll(): Promise<ClientInteraction[]> {
    return [...this.interactions];
  }

  async getByClientId(clientId: string): Promise<ClientInteraction[]> {
    return this.interactions.filter(
      (interaction) => interaction.clientId === clientId,
    );
  }

  async create(
    interaction: Omit<ClientInteraction, "id" | "createdAt" | "updatedAt">,
  ): Promise<ClientInteraction> {
    const now = new Date().toISOString();

    const newInteraction: ClientInteraction = {
      ...interaction,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.interactions.push(newInteraction);

    this.save();

    return newInteraction;
  }

  async update(
    id: string,
    data: Partial<ClientInteraction>,
  ): Promise<ClientInteraction | undefined> {
    const index = this.interactions.findIndex(
      (interaction) => interaction.id === id,
    );

    if (index === -1) {
      return undefined;
    }

    this.interactions[index] = {
      ...this.interactions[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.interactions[index];
  }

  async delete(id: string): Promise<void> {
    this.interactions = this.interactions.filter(
      (interaction) => interaction.id !== id,
    );

    this.save();
  }
}

export const clientInteractionsService = new ClientInteractionsService();
