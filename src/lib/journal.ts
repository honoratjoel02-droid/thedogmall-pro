// src/lib/journal.ts

import type { Dog } from "../types/dog";
import type { Breeding } from "../types/models/breeding";
import type { Litter } from "../types/models/litter";
import type { Puppy } from "../types/models/puppy";
import type { Client } from "../types/models/client";
import type { Expense } from "../types/models/expense";
import type { Income } from "../types/models/income";

export interface JournalEntry {
  id: string;
  message: string;
  date: string;
  link?: string;
}

type ComputeJournalParams = {
  dogs: Dog[];
  breedings: Breeding[];
  litters: Litter[];
  puppies: Puppy[];
  clients: Client[];
  expenses: Expense[];
  incomes: Income[];
};

export function computeJournal({
  dogs,
  breedings,
  litters,
  puppies,
  clients,
  expenses,
  incomes,
}: ComputeJournalParams): JournalEntry[] {
  const dogName = (id: string) => dogs.find((d) => d.id === id)?.name ?? "?";

  const entries: JournalEntry[] = [];

  for (const breeding of breedings) {
    entries.push({
      id: `breeding-${breeding.id}`,
      message: `Saillie enregistrée : ${dogName(breeding.femaleId)} × ${dogName(breeding.maleId)}`,
      date: breeding.createdAt,
      link: `/breeding/${breeding.id}`,
    });
  }

  for (const litter of litters) {
    entries.push({
      id: `litter-${litter.id}`,
      message: `Nouvelle portée : ${dogName(litter.femaleId)} × ${dogName(litter.maleId)}`,
      date: litter.createdAt,
      link: `/litters/${litter.id}`,
    });
  }

  for (const puppy of puppies) {
    entries.push({
      id: `puppy-${puppy.id}`,
      message: `Chiot ajouté : ${puppy.identifier}`,
      date: puppy.createdAt,
      link: `/litters/${puppy.litterId}`,
    });
  }

  for (const client of clients) {
    entries.push({
      id: `client-${client.id}`,
      message: `Nouveau client : ${client.firstName} ${client.lastName}`,
      date: client.createdAt,
      link: `/clients/${client.id}`,
    });
  }

  for (const expense of expenses) {
    entries.push({
      id: `expense-${expense.id}`,
      message: `Dépense enregistrée : ${expense.title} (-${expense.amount.toLocaleString("fr-FR")} FCFA)`,
      date: expense.createdAt,
      link: "/finances",
    });
  }

  for (const income of incomes) {
    entries.push({
      id: `income-${income.id}`,
      message: `Recette enregistrée : ${income.title} (+${income.amount.toLocaleString("fr-FR")} FCFA)`,
      date: income.createdAt,
      link: "/finances",
    });
  }

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}
