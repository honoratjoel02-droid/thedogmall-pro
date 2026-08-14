// src/lib/weight.ts

import type { Dog } from "../types/dog";

export function getCurrentWeightKg(dog: Pick<Dog, "weight" | "weightHistory">): number {
  if (dog.weightHistory.length === 0) {
    return dog.weight;
  }

  const latest = dog.weightHistory[dog.weightHistory.length - 1];

  return latest.weightGrams / 1000;
}
