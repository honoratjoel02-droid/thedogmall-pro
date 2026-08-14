import { describe, it, expect } from "vitest";

import { computeInbreedingCoefficient } from "./coi";
import type { Dog } from "../types/dog";

function makeDog(overrides: Partial<Dog> & { id: string }): Dog {
  return {
    name: overrides.id,
    sex: "Mâle",
    breed: "Berger Australien",
    color: "Noir",
    birthDate: "2020-01-01",
    weight: 20,
    status: "Disponible",
    ...overrides,
  };
}

describe("computeInbreedingCoefficient", () => {
  it("returns 0 for two dogs with no shared ancestry", () => {
    const sire = makeDog({ id: "sire" });
    const dam = makeDog({ id: "dam" });

    const dogsById = new Map([sire, dam].map((d) => [d.id, d]));

    const result = computeInbreedingCoefficient("sire", "dam", dogsById);

    expect(result.coefficient).toBe(0);
    expect(result.commonAncestors).toEqual([]);
  });

  it("computes 25% for a father-daughter mating", () => {
    const grandsire = makeDog({ id: "grandsire" });
    const dam = makeDog({ id: "dam", sireId: "grandsire" });

    const dogsById = new Map([grandsire, dam].map((d) => [d.id, d]));

    const result = computeInbreedingCoefficient("grandsire", "dam", dogsById);

    expect(result.coefficient).toBeCloseTo(0.25);
    expect(result.commonAncestors.map((c) => c.dog.id)).toEqual(["grandsire"]);
  });

  it("computes 25% for full siblings mated together", () => {
    const grandsire = makeDog({ id: "grandsire" });
    const granddam = makeDog({ id: "granddam" });
    const sire = makeDog({ id: "sire", sireId: "grandsire", damId: "granddam" });
    const dam = makeDog({ id: "dam", sireId: "grandsire", damId: "granddam" });

    const dogsById = new Map(
      [grandsire, granddam, sire, dam].map((d) => [d.id, d]),
    );

    const result = computeInbreedingCoefficient("sire", "dam", dogsById);

    expect(result.coefficient).toBeCloseTo(0.25);
    expect(result.commonAncestors.map((c) => c.dog.id).sort()).toEqual(
      ["grandsire", "granddam"].sort(),
    );
  });

  it("computes 12.5% for paternal half-siblings mated together", () => {
    const commonSire = makeDog({ id: "common-sire" });
    const sire = makeDog({ id: "sire", sireId: "common-sire" });
    const dam = makeDog({ id: "dam", sireId: "common-sire" });

    const dogsById = new Map(
      [commonSire, sire, dam].map((d) => [d.id, d]),
    );

    const result = computeInbreedingCoefficient("sire", "dam", dogsById);

    expect(result.coefficient).toBeCloseTo(0.125);
  });

  it("ignores unknown ancestors beyond recorded data", () => {
    const sire = makeDog({ id: "sire", sireId: "missing" });
    const dam = makeDog({ id: "dam" });

    const dogsById = new Map([sire, dam].map((d) => [d.id, d]));

    const result = computeInbreedingCoefficient("sire", "dam", dogsById);

    expect(result.coefficient).toBe(0);
  });
});
