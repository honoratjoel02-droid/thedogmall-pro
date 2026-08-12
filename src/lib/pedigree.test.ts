import { describe, it, expect } from "vitest";

import { buildPedigreeTree, getDescendants } from "./pedigree";
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

describe("buildPedigreeTree", () => {
  it("builds a tree with known ancestors across generations", () => {
    const grandsire = makeDog({ id: "grandsire" });
    const granddam = makeDog({ id: "granddam" });
    const sire = makeDog({ id: "sire", sireId: "grandsire", damId: "granddam" });
    const dam = makeDog({ id: "dam" });
    const dog = makeDog({ id: "dog", sireId: "sire", damId: "dam" });

    const dogsById = new Map(
      [grandsire, granddam, sire, dam, dog].map((d) => [d.id, d]),
    );

    const tree = buildPedigreeTree(dog, dogsById, 4);

    expect(tree.dog?.id).toBe("dog");
    expect(tree.sire?.dog?.id).toBe("sire");
    expect(tree.dam?.dog?.id).toBe("dam");
    expect(tree.sire?.sire?.dog?.id).toBe("grandsire");
    expect(tree.sire?.dam?.dog?.id).toBe("granddam");
  });

  it("stops recursing once an ancestor is unknown", () => {
    const dog = makeDog({ id: "dog" });

    const dogsById = new Map([[dog.id, dog]]);

    const tree = buildPedigreeTree(dog, dogsById, 4);

    expect(tree.dog?.id).toBe("dog");
    expect(tree.sire?.dog).toBeNull();
    expect(tree.sire?.sire).toBeNull();
    expect(tree.dam?.dog).toBeNull();
    expect(tree.dam?.sire).toBeNull();
  });

  it("returns a leaf node when depth is 1", () => {
    const sire = makeDog({ id: "sire" });
    const dog = makeDog({ id: "dog", sireId: "sire" });

    const dogsById = new Map([sire, dog].map((d) => [d.id, d]));

    const tree = buildPedigreeTree(dog, dogsById, 1);

    expect(tree.dog?.id).toBe("dog");
    expect(tree.sire).toBeNull();
    expect(tree.dam).toBeNull();
  });

  it("returns a null-dog node when the root dog is undefined", () => {
    const tree = buildPedigreeTree(undefined, new Map(), 4);

    expect(tree.dog).toBeNull();
    expect(tree.sire).toBeNull();
    expect(tree.dam).toBeNull();
  });
});

describe("getDescendants", () => {
  it("returns dogs whose sire or dam matches the given id", () => {
    const parent = makeDog({ id: "parent" });
    const childBySire = makeDog({ id: "child-a", sireId: "parent" });
    const childByDam = makeDog({ id: "child-b", damId: "parent" });
    const unrelated = makeDog({ id: "unrelated" });

    const descendants = getDescendants("parent", [
      parent,
      childBySire,
      childByDam,
      unrelated,
    ]);

    expect(descendants.map((d) => d.id).sort()).toEqual([
      "child-a",
      "child-b",
    ]);
  });

  it("returns an empty array when there are no descendants", () => {
    const dog = makeDog({ id: "dog" });

    expect(getDescendants("dog", [dog])).toEqual([]);
  });
});
