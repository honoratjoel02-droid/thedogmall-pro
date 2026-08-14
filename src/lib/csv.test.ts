// src/lib/csv.test.ts

import { describe, expect, it } from "vitest";

import { toCsv } from "./csv";

type Row = { name: string; amount: number };

describe("toCsv", () => {
  it("builds a header row from column definitions", () => {
    const csv = toCsv<Row>([], [
      { header: "Nom", accessor: (r) => r.name },
      { header: "Montant", accessor: (r) => r.amount },
    ]);

    expect(csv).toBe("Nom,Montant");
  });

  it("renders one line per row in column order", () => {
    const rows: Row[] = [
      { name: "Maya", amount: 150000 },
      { name: "Max", amount: 200000 },
    ];

    const csv = toCsv(rows, [
      { header: "Nom", accessor: (r) => r.name },
      { header: "Montant", accessor: (r) => r.amount },
    ]);

    expect(csv).toBe("Nom,Montant\nMaya,150000\nMax,200000");
  });

  it("quotes fields containing commas", () => {
    const csv = toCsv([{ name: "Doe, John", amount: 1 }], [
      { header: "Nom", accessor: (r) => r.name },
      { header: "Montant", accessor: (r) => r.amount },
    ]);

    expect(csv).toBe('Nom,Montant\n"Doe, John",1');
  });

  it("escapes embedded quotes by doubling them", () => {
    const csv = toCsv([{ name: 'Le "Champion"', amount: 1 }], [
      { header: "Nom", accessor: (r) => r.name },
      { header: "Montant", accessor: (r) => r.amount },
    ]);

    expect(csv).toBe('Nom,Montant\n"Le ""Champion""",1');
  });

  it("quotes fields containing newlines", () => {
    const csv = toCsv([{ name: "Ligne 1\nLigne 2", amount: 1 }], [
      { header: "Nom", accessor: (r) => r.name },
      { header: "Montant", accessor: (r) => r.amount },
    ]);

    expect(csv).toBe('Nom,Montant\n"Ligne 1\nLigne 2",1');
  });

  it("falls back to an empty string for null or undefined values", () => {
    const csv = toCsv([{ name: "Maya", amount: 1 }], [
      { header: "Nom", accessor: () => null },
      { header: "Montant", accessor: () => undefined },
    ]);

    expect(csv).toBe("Nom,Montant\n,");
  });
});
