// src/types/models/feedingLog.ts

export interface FeedingLog {
  id: string;

  dogId: string;

  date: string;

  foodBrand: string;

  dailyQuantityGrams: number;

  mealsPerDay: number;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
