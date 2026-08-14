// src/lib/coi.ts

import type { Dog } from "../types/dog";

export interface CommonAncestor {
  dog: Dog;
  contribution: number;
}

export interface InbreedingResult {
  coefficient: number;
  commonAncestors: CommonAncestor[];
}

const DEFAULT_MAX_GENERATIONS = 8;

function collectAncestorPaths(
  dogId: string | undefined,
  dogsById: Map<string, Dog>,
  depth: number,
  maxDepth: number,
  paths: Map<string, number[]>,
): void {
  if (!dogId || depth > maxDepth) return;

  const dog = dogsById.get(dogId);
  if (!dog) return;

  const existing = paths.get(dogId);
  if (existing) {
    existing.push(depth);
  } else {
    paths.set(dogId, [depth]);
  }

  collectAncestorPaths(dog.sireId, dogsById, depth + 1, maxDepth, paths);
  collectAncestorPaths(dog.damId, dogsById, depth + 1, maxDepth, paths);
}

export function computeInbreedingCoefficient(
  sireId: string,
  damId: string,
  dogsById: Map<string, Dog>,
  maxGenerations = DEFAULT_MAX_GENERATIONS,
): InbreedingResult {
  const sirePaths = new Map<string, number[]>();
  const damPaths = new Map<string, number[]>();

  collectAncestorPaths(sireId, dogsById, 0, maxGenerations, sirePaths);
  collectAncestorPaths(damId, dogsById, 0, maxGenerations, damPaths);

  let coefficient = 0;
  const commonAncestors: CommonAncestor[] = [];

  for (const [ancestorId, sireDepths] of sirePaths) {
    const damDepths = damPaths.get(ancestorId);
    if (!damDepths) continue;

    const dog = dogsById.get(ancestorId);
    if (!dog) continue;

    let contribution = 0;
    for (const n1 of sireDepths) {
      for (const n2 of damDepths) {
        contribution += 2 ** -(n1 + n2 + 1);
      }
    }

    coefficient += contribution;
    commonAncestors.push({ dog, contribution });
  }

  commonAncestors.sort((a, b) => b.contribution - a.contribution);

  return { coefficient, commonAncestors };
}
