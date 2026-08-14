import { describe, it, expect } from "vitest";

import { buildSearchIndex, searchResults } from "./search";
import type { Dog } from "../types/dog";
import type { Client } from "../types/models/client";
import type { Litter } from "../types/models/litter";
import type { Breeding } from "../types/models/breeding";

const dogs: Dog[] = [
  { id: "maya", name: "Maya", sex: "Femelle", breed: "Berger Australien", color: "Noir", birthDate: "2022-01-01", weight: 20, weightHistory: [], status: "Disponible" },
  { id: "max", name: "Max", sex: "Mâle", breed: "Berger Australien", color: "Noir", birthDate: "2021-01-01", weight: 25, weightHistory: [], status: "Disponible" },
  { id: "lea", name: "Léa", sex: "Femelle", breed: "Labrador", color: "Blond", birthDate: "2023-01-01", weight: 22, weightHistory: [], status: "Réservé" },
];

const clients: Client[] = [
  { id: "c1", firstName: "Julie", lastName: "Martin", email: "julie@example.com", createdAt: "", updatedAt: "" },
];

const litters: Litter[] = [
  { id: "l1", pregnancyId: "p1", femaleId: "maya", maleId: "max", birthDate: "2026-08-11", puppiesCount: 5, malesCount: 3, femalesCount: 2, createdAt: "", updatedAt: "" },
];

const breedings: Breeding[] = [
  { id: "b1", femaleId: "maya", maleId: "max", breedingDate: "2026-06-01", method: "Naturelle", status: "Terminée", createdAt: "", updatedAt: "" },
];

const index = buildSearchIndex({ dogs, clients, litters, breedings });

describe("buildSearchIndex", () => {
  it("indexes every entity across all four categories", () => {
    const categories = new Set(index.map((r) => r.category));

    expect(categories).toEqual(new Set(["Chiens", "Clients", "Portées", "Saillies"]));
    expect(index).toHaveLength(dogs.length + clients.length + litters.length + breedings.length);
  });

  it("labels litters and breedings as 'female × male'", () => {
    const litterResult = index.find((r) => r.id === "litter-l1");
    const breedingResult = index.find((r) => r.id === "breeding-b1");

    expect(litterResult?.title).toBe("Maya × Max");
    expect(breedingResult?.title).toBe("Maya × Max");
  });
});

describe("searchResults", () => {
  it("returns nothing for an empty query", () => {
    expect(searchResults(index, "")).toEqual([]);
    expect(searchResults(index, "   ")).toEqual([]);
  });

  it("matches case-insensitively", () => {
    const results = searchResults(index, "MAYA");

    expect(results.some((r) => r.title === "Maya")).toBe(true);
  });

  it("matches without requiring accents", () => {
    const results = searchResults(index, "lea");

    expect(results.some((r) => r.title === "Léa")).toBe(true);
  });

  it("matches against the subtitle as well as the title", () => {
    const results = searchResults(index, "julie@example.com");

    expect(results.some((r) => r.title === "Julie Martin")).toBe(true);
  });

  it("excludes non-matching entries", () => {
    const results = searchResults(index, "zzz-does-not-exist");

    expect(results).toEqual([]);
  });
});
