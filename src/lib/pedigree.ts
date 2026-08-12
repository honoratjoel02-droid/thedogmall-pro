// src/lib/pedigree.ts

import type { Dog } from "../types/dog";

export interface PedigreeNode {
  dog: Dog | null;
  sire: PedigreeNode | null;
  dam: PedigreeNode | null;
}

export function buildPedigreeTree(
  dog: Dog | undefined,
  dogsById: Map<string, Dog>,
  depth: number,
): PedigreeNode {
  if (depth <= 1 || !dog) {
    return { dog: dog ?? null, sire: null, dam: null };
  }

  const sire = dog.sireId ? dogsById.get(dog.sireId) : undefined;
  const dam = dog.damId ? dogsById.get(dog.damId) : undefined;

  return {
    dog,
    sire: buildPedigreeTree(sire, dogsById, depth - 1),
    dam: buildPedigreeTree(dam, dogsById, depth - 1),
  };
}

export function getDescendants(dogId: string, dogs: Dog[]): Dog[] {
  return dogs.filter((dog) => dog.sireId === dogId || dog.damId === dogId);
}
