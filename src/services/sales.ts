// src/services/sales.ts

import type { Sale } from "../types/models/sale";

const STORAGE_KEY = "thedogmall.sales";

class SalesService {
  private sales: Sale[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.sales = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.sales));
  }

  async getAll(): Promise<Sale[]> {
    return [...this.sales];
  }

  async getByPuppyId(puppyId: string): Promise<Sale | undefined> {
    return this.sales.find((sale) => sale.puppyId === puppyId);
  }

  async getByClientId(clientId: string): Promise<Sale[]> {
    return this.sales.filter((sale) => sale.clientId === clientId);
  }

  async create(
    sale: Omit<Sale, "id" | "createdAt" | "updatedAt">,
  ): Promise<Sale> {
    const now = new Date().toISOString();

    const newSale: Sale = {
      ...sale,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.sales.push(newSale);

    this.save();

    return newSale;
  }

  async delete(id: string): Promise<void> {
    this.sales = this.sales.filter((sale) => sale.id !== id);

    this.save();
  }
}

export const salesService = new SalesService();
