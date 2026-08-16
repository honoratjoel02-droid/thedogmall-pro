// src/services/contractTemplates.ts

import type { ContractTemplate } from "../types/models/contractTemplate";

const STORAGE_KEY = "thedogmall.contractTemplates";

class ContractTemplatesService {
  private templates: ContractTemplate[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.templates = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.templates));
  }

  async getAll(): Promise<ContractTemplate[]> {
    return [...this.templates];
  }

  async create(
    template: Omit<ContractTemplate, "id" | "createdAt" | "updatedAt">,
  ): Promise<ContractTemplate> {
    const now = new Date().toISOString();

    if (template.isDefault) {
      this.templates = this.templates.map((t) => ({ ...t, isDefault: false }));
    }

    const newTemplate: ContractTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.templates.push(newTemplate);

    this.save();

    return newTemplate;
  }

  async update(
    id: string,
    data: Partial<ContractTemplate>,
  ): Promise<ContractTemplate | undefined> {
    const index = this.templates.findIndex((t) => t.id === id);

    if (index === -1) {
      return undefined;
    }

    if (data.isDefault) {
      this.templates = this.templates.map((t) =>
        t.id === id ? t : { ...t, isDefault: false },
      );
    }

    this.templates[index] = {
      ...this.templates[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.templates[index];
  }

  async delete(id: string): Promise<void> {
    this.templates = this.templates.filter((t) => t.id !== id);

    this.save();
  }
}

export const contractTemplatesService = new ContractTemplatesService();
