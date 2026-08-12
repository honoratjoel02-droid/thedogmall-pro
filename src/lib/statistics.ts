// src/lib/statistics.ts

import type { Breeding } from "../types/models/breeding";
import type { Litter } from "../types/models/litter";
import type { Sale } from "../types/models/sale";
import type { Dog } from "../types/dog";
import type { Client } from "../types/models/client";

export interface Breakdown {
  label: string;
  count: number;
}

export interface BreedingSuccessStats {
  rate: number;
  successful: number;
  completed: number;
}

export function computeBreedingSuccessRate(
  breedings: Breeding[],
): BreedingSuccessStats {
  const completed = breedings.filter(
    (b) =>
      b.status === "Gestation confirmée" ||
      b.status === "Terminée" ||
      b.status === "Échec",
  );

  const successful = completed.filter(
    (b) => b.status === "Gestation confirmée" || b.status === "Terminée",
  );

  const rate =
    completed.length > 0
      ? Math.round((successful.length / completed.length) * 100)
      : 0;

  return { rate, successful: successful.length, completed: completed.length };
}

export function computeBreedingOutcomeBreakdown(
  breedings: Breeding[],
): { successful: number; failed: number; pending: number } {
  let successful = 0;
  let failed = 0;
  let pending = 0;

  for (const breeding of breedings) {
    if (
      breeding.status === "Gestation confirmée" ||
      breeding.status === "Terminée"
    ) {
      successful++;
    } else if (breeding.status === "Échec") {
      failed++;
    } else {
      pending++;
    }
  }

  return { successful, failed, pending };
}

export function computeAverageIncomePerLitter(
  litters: Litter[],
  sales: Sale[],
): number {
  const totalsByLitter = new Map<string, number>();

  for (const sale of sales) {
    totalsByLitter.set(
      sale.litterId,
      (totalsByLitter.get(sale.litterId) ?? 0) + sale.price,
    );
  }

  const litterIdsWithSales = litters
    .map((litter) => litter.id)
    .filter((id) => totalsByLitter.has(id));

  if (litterIdsWithSales.length === 0) return 0;

  const total = litterIdsWithSales.reduce(
    (sum, id) => sum + (totalsByLitter.get(id) ?? 0),
    0,
  );

  return Math.round(total / litterIdsWithSales.length);
}

export function computeAverageLitterSize(litters: Litter[]): number {
  if (litters.length === 0) return 0;

  const total = litters.reduce((sum, litter) => sum + litter.puppiesCount, 0);

  return Math.round((total / litters.length) * 10) / 10;
}

export function computeAveragePuppyPrice(sales: Sale[]): number {
  if (sales.length === 0) return 0;

  const total = sales.reduce((sum, sale) => sum + sale.price, 0);

  return Math.round(total / sales.length);
}

export function computeDogsByStatus(dogs: Dog[]): Breakdown[] {
  const totals = new Map<string, number>();

  for (const dog of dogs) {
    totals.set(dog.status, (totals.get(dog.status) ?? 0) + 1);
  }

  return [...totals.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

const MAX_TOP_CLIENTS = 5;

export function computeTopClients(
  clients: Client[],
  sales: Sale[],
): Breakdown[] {
  const totals = new Map<string, number>();

  for (const sale of sales) {
    totals.set(sale.clientId, (totals.get(sale.clientId) ?? 0) + 1);
  }

  return [...totals.entries()]
    .map(([clientId, count]) => {
      const client = clients.find((c) => c.id === clientId);

      return {
        label: client ? `${client.firstName} ${client.lastName}` : "Client inconnu",
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_TOP_CLIENTS);
}
