// src/types/models/sale.ts

export interface Payment {
  id: string;

  amount: number;

  date: string;

  notes?: string;

  incomeId?: string;
}

export interface Sale {
  id: string;

  puppyId: string;

  litterId: string;

  clientId: string;

  price: number;

  saleDate: string;

  contractSigned: boolean;

  payments: Payment[];

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
