// src/lib/search.ts

import type { Dog } from "../types/dog";
import type { Client } from "../types/models/client";
import type { Litter } from "../types/models/litter";
import type { Breeding } from "../types/models/breeding";

export type SearchResultCategory = "Chiens" | "Clients" | "Portées" | "Saillies";

export interface SearchResult {
  id: string;
  category: SearchResultCategory;
  title: string;
  subtitle?: string;
  link: string;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

type BuildSearchIndexParams = {
  dogs: Dog[];
  clients: Client[];
  litters: Litter[];
  breedings: Breeding[];
};

export function buildSearchIndex({
  dogs,
  clients,
  litters,
  breedings,
}: BuildSearchIndexParams): SearchResult[] {
  const dogName = (id: string) => dogs.find((d) => d.id === id)?.name ?? "Chien inconnu";

  const dogResults: SearchResult[] = dogs.map((dog) => ({
    id: `dog-${dog.id}`,
    category: "Chiens",
    title: dog.name,
    subtitle: `${dog.breed} · ${dog.sex}`,
    link: `/dogs/${dog.id}`,
  }));

  const clientResults: SearchResult[] = clients.map((client) => ({
    id: `client-${client.id}`,
    category: "Clients",
    title: `${client.firstName} ${client.lastName}`,
    subtitle: client.email ?? client.phone,
    link: `/clients/${client.id}`,
  }));

  const litterResults: SearchResult[] = litters.map((litter) => ({
    id: `litter-${litter.id}`,
    category: "Portées",
    title: `${dogName(litter.femaleId)} × ${dogName(litter.maleId)}`,
    subtitle: `Née le ${new Date(litter.birthDate).toLocaleDateString("fr-FR")}`,
    link: `/litters/${litter.id}`,
  }));

  const breedingResults: SearchResult[] = breedings.map((breeding) => ({
    id: `breeding-${breeding.id}`,
    category: "Saillies",
    title: `${dogName(breeding.femaleId)} × ${dogName(breeding.maleId)}`,
    subtitle: `${breeding.method} · ${breeding.status}`,
    link: `/breeding/${breeding.id}`,
  }));

  return [...dogResults, ...clientResults, ...litterResults, ...breedingResults];
}

export function searchResults(index: SearchResult[], query: string): SearchResult[] {
  const trimmed = query.trim();

  if (!trimmed) return [];

  const needle = normalize(trimmed);

  return index.filter((result) =>
    normalize(`${result.title} ${result.subtitle ?? ""}`).includes(needle),
  );
}
