// src/types/models/sale.ts

export interface Sale {
  id: string;

  puppyId: string;

  litterId: string;

  clientId: string;

  price: number;

  saleDate: string;

  contractSigned: boolean;

  incomeId?: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
