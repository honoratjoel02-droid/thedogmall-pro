// src/types/models/client.ts

export interface Client {
  id: string;

  firstName: string;

  lastName: string;

  email?: string;

  phone?: string;

  address?: string;

  notes?: string;

  tags?: string[];

  createdAt: string;

  updatedAt: string;
}
