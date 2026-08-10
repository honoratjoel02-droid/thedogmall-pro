// src/services/clients.ts

import type { Client } from "../types/models/client";

const STORAGE_KEY = "thedogmall.clients";

class ClientsService {
  private clients: Client[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.clients = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.clients));
  }

  async getAll(): Promise<Client[]> {
    return [...this.clients];
  }

  async getById(id: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.id === id);
  }

  async create(
    client: Omit<Client, "id" | "createdAt" | "updatedAt">,
  ): Promise<Client> {
    const now = new Date().toISOString();

    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.clients.push(newClient);

    this.save();

    return newClient;
  }

  async update(
    id: string,
    data: Partial<Client>,
  ): Promise<Client | undefined> {
    const index = this.clients.findIndex((client) => client.id === id);

    if (index === -1) {
      return undefined;
    }

    this.clients[index] = {
      ...this.clients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.clients[index];
  }

  async delete(id: string): Promise<void> {
    this.clients = this.clients.filter((client) => client.id !== id);

    this.save();
  }
}

export const clientsService = new ClientsService();
