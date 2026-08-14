// src/types/models/geneticTest.ts

export type GeneticTestResult = "Normal" | "Porteur" | "Atteint" | "En attente";

export interface GeneticTest {
  id: string;

  dogId: string;

  testName: string;

  testDate: string;

  result: GeneticTestResult;

  laboratory?: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
