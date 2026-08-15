// src/types/models/annualGoal.ts

export interface AnnualGoal {
  id: string;

  year: number;

  targetLitters?: number;

  targetRevenue?: number;

  targetReservations?: number;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
