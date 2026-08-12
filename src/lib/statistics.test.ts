import { describe, it, expect } from "vitest";

import {
  computeAverageIncomePerLitter,
  computeAverageLitterSize,
  computeAveragePuppyPrice,
  computeBreedingOutcomeBreakdown,
  computeBreedingSuccessRate,
  computeDogsByStatus,
  computeTopClients,
} from "./statistics";
import type { Breeding, BreedingStatus } from "../types/models/breeding";
import type { Litter } from "../types/models/litter";
import type { Sale } from "../types/models/sale";
import type { Dog } from "../types/dog";
import type { Client } from "../types/models/client";

function makeBreeding(status: BreedingStatus, id: string = status): Breeding {
  return {
    id,
    femaleId: "f1",
    maleId: "m1",
    breedingDate: "2026-01-01",
    method: "Naturelle",
    status,
    createdAt: "",
    updatedAt: "",
  };
}

describe("computeBreedingSuccessRate", () => {
  it("counts only resolved breedings in the denominator", () => {
    const breedings = [
      makeBreeding("Gestation confirmée", "a"),
      makeBreeding("Terminée", "b"),
      makeBreeding("Échec", "c"),
      makeBreeding("Planifiée", "d"),
      makeBreeding("En cours", "e"),
    ];

    const result = computeBreedingSuccessRate(breedings);

    expect(result.completed).toBe(3);
    expect(result.successful).toBe(2);
    expect(result.rate).toBe(67);
  });

  it("returns a 0% rate when nothing has been resolved yet", () => {
    const result = computeBreedingSuccessRate([makeBreeding("Planifiée")]);

    expect(result).toEqual({ rate: 0, successful: 0, completed: 0 });
  });
});

describe("computeBreedingOutcomeBreakdown", () => {
  it("buckets breedings into successful, failed, and pending", () => {
    const breedings = [
      makeBreeding("Gestation confirmée", "a"),
      makeBreeding("Terminée", "b"),
      makeBreeding("Échec", "c"),
      makeBreeding("Planifiée", "d"),
      makeBreeding("En cours", "e"),
    ];

    expect(computeBreedingOutcomeBreakdown(breedings)).toEqual({
      successful: 2,
      failed: 1,
      pending: 2,
    });
  });
});

function makeLitter(id: string, puppiesCount: number): Litter {
  return {
    id,
    pregnancyId: `p-${id}`,
    femaleId: "f1",
    maleId: "m1",
    birthDate: "2026-01-01",
    puppiesCount,
    malesCount: Math.floor(puppiesCount / 2),
    femalesCount: Math.ceil(puppiesCount / 2),
    createdAt: "",
    updatedAt: "",
  };
}

function makeSale(id: string, litterId: string, clientId: string, price: number): Sale {
  return {
    id,
    puppyId: `puppy-${id}`,
    litterId,
    clientId,
    price,
    saleDate: "2026-01-01",
    contractSigned: true,
    createdAt: "",
    updatedAt: "",
  };
}

describe("computeAverageIncomePerLitter", () => {
  it("averages revenue only across litters that produced at least one sale", () => {
    const litters = [makeLitter("l1", 5), makeLitter("l2", 4), makeLitter("l3", 3)];
    const sales = [
      makeSale("s1", "l1", "c1", 1000),
      makeSale("s2", "l1", "c2", 2000),
      makeSale("s3", "l2", "c1", 3000),
    ];

    expect(computeAverageIncomePerLitter(litters, sales)).toBe(3000);
  });

  it("returns 0 when there are no sales", () => {
    expect(computeAverageIncomePerLitter([makeLitter("l1", 5)], [])).toBe(0);
  });
});

describe("computeAverageLitterSize", () => {
  it("averages puppiesCount across litters, rounded to one decimal", () => {
    const litters = [makeLitter("l1", 5), makeLitter("l2", 4), makeLitter("l3", 3)];

    expect(computeAverageLitterSize(litters)).toBe(4);
  });

  it("returns 0 for no litters", () => {
    expect(computeAverageLitterSize([])).toBe(0);
  });
});

describe("computeAveragePuppyPrice", () => {
  it("averages sale prices", () => {
    const sales = [makeSale("s1", "l1", "c1", 1000), makeSale("s2", "l1", "c1", 2000)];

    expect(computeAveragePuppyPrice(sales)).toBe(1500);
  });

  it("returns 0 for no sales", () => {
    expect(computeAveragePuppyPrice([])).toBe(0);
  });
});

describe("computeDogsByStatus", () => {
  it("counts and ranks dogs by status, descending", () => {
    const dogs: Dog[] = [
      { id: "1", name: "A", sex: "Mâle", breed: "B", color: "C", birthDate: "", weight: 1, status: "Disponible" },
      { id: "2", name: "B", sex: "Mâle", breed: "B", color: "C", birthDate: "", weight: 1, status: "Disponible" },
      { id: "3", name: "C", sex: "Femelle", breed: "B", color: "C", birthDate: "", weight: 1, status: "Réservé" },
    ];

    expect(computeDogsByStatus(dogs)).toEqual([
      { label: "Disponible", count: 2 },
      { label: "Réservé", count: 1 },
    ]);
  });
});

describe("computeTopClients", () => {
  const clients: Client[] = [
    { id: "c1", firstName: "Julie", lastName: "Martin", createdAt: "", updatedAt: "" },
    { id: "c2", firstName: "Marc", lastName: "Dupont", createdAt: "", updatedAt: "" },
  ];

  it("ranks clients by purchase count, descending", () => {
    const sales = [
      makeSale("s1", "l1", "c1", 1000),
      makeSale("s2", "l1", "c1", 1000),
      makeSale("s3", "l1", "c2", 1000),
    ];

    expect(computeTopClients(clients, sales)).toEqual([
      { label: "Julie Martin", count: 2 },
      { label: "Marc Dupont", count: 1 },
    ]);
  });

  it("falls back to 'Client inconnu' when the client record is missing", () => {
    const sales = [makeSale("s1", "l1", "ghost", 1000)];

    expect(computeTopClients(clients, sales)).toEqual([
      { label: "Client inconnu", count: 1 },
    ]);
  });

  it("limits the result to the top 5 clients", () => {
    const manyClients: Client[] = Array.from({ length: 7 }, (_, i) => ({
      id: `c${i}`,
      firstName: `Client${i}`,
      lastName: "X",
      createdAt: "",
      updatedAt: "",
    }));

    const sales = manyClients.map((c, i) =>
      makeSale(`s${i}`, "l1", c.id, 1000 + i),
    );

    expect(computeTopClients(manyClients, sales)).toHaveLength(5);
  });
});
