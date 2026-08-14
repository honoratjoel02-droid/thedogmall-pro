import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GitCompare, Heart } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useLitters } from "../hooks/useLitters";
import { useDogs } from "../hooks/useDogs";
import { usePuppies } from "../hooks/usePuppies";
import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";

import { computeLitterMetrics, type LitterMetrics } from "../lib/litterComparison";

const MAX_SELECTION = 4;

const METRIC_ROWS: {
  key: string;
  label: string;
  format: (m: LitterMetrics) => string;
}[] = [
  { key: "total", label: "Chiots au total", format: (m) => `${m.puppiesCount}` },
  {
    key: "sex",
    label: "Mâles / Femelles",
    format: (m) => `${m.malesCount} / ${m.femalesCount}`,
  },
  {
    key: "status",
    label: "Disponibles / Réservés / Vendus / Conservés",
    format: (m) =>
      `${m.availableCount} / ${m.reservedCount} / ${m.soldCount} / ${m.keptCount}`,
  },
  {
    key: "birthWeight",
    label: "Poids moyen à la naissance",
    format: (m) => (m.avgBirthWeightGrams != null ? `${m.avgBirthWeightGrams} g` : "—"),
  },
  {
    key: "currentWeight",
    label: "Poids moyen actuel",
    format: (m) => (m.avgCurrentWeightGrams != null ? `${m.avgCurrentWeightGrams} g` : "—"),
  },
  {
    key: "income",
    label: "Recettes",
    format: (m) => `${m.totalIncome.toLocaleString("fr-FR")} FCFA`,
  },
  {
    key: "expense",
    label: "Dépenses",
    format: (m) => `${m.totalExpense.toLocaleString("fr-FR")} FCFA`,
  },
  {
    key: "profit",
    label: "Solde",
    format: (m) => `${m.profit >= 0 ? "+" : ""}${m.profit.toLocaleString("fr-FR")} FCFA`,
  },
];

export default function LitterComparator() {
  const { data: litters = [] } = useLitters();
  const { data: dogs = [] } = useDogs();
  const { data: puppies = [] } = usePuppies();
  const { data: expenses = [] } = useExpenses();
  const { data: incomes = [] } = useIncomes();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggle(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, id];
    });
  }

  function dogName(id: string) {
    return dogs.find((d) => d.id === id)?.name ?? "Inconnu";
  }

  const selectedLitters = litters.filter((l) => selectedIds.includes(l.id));

  const metricsByLitterId = useMemo(() => {
    const map = new Map<string, LitterMetrics>();

    for (const litter of selectedLitters) {
      map.set(litter.id, computeLitterMetrics(litter, puppies, expenses, incomes));
    }

    return map;
  }, [selectedLitters, puppies, expenses, incomes]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
              <GitCompare className="size-8 text-primary" />
              Comparateur de portées
            </h1>

            <p className="text-muted-foreground">
              Sélectionnez jusqu'à {MAX_SELECTION} portées pour comparer leurs
              performances.
            </p>
          </div>

          <Button
            variant="outline"
            render={(props) => (
              <Link {...props} to="/litters">
                ← Retour aux portées
              </Link>
            )}
          />
        </div>

        <Card>
          <CardContent className="p-6">
            {litters.length === 0 ? (
              <p className="text-muted-foreground">Aucune portée enregistrée.</p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {litters.map((litter) => {
                  const checked = selectedIds.includes(litter.id);
                  const disabled = !checked && selectedIds.length >= MAX_SELECTION;

                  return (
                    <label
                      key={litter.id}
                      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                        disabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="size-4 accent-primary"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggle(litter.id)}
                      />

                      <span className="flex items-center gap-1 truncate">
                        {dogName(litter.femaleId)}
                        <Heart className="size-3 shrink-0 fill-primary text-primary" />
                        {dogName(litter.maleId)}
                      </span>

                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedLitters.length < 2 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Sélectionnez au moins 2 portées pour afficher la comparaison.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicateur</TableHead>

                    {selectedLitters.map((litter) => (
                      <TableHead key={litter.id}>
                        <div className="flex flex-col gap-0.5 whitespace-normal">
                          <span className="flex items-center gap-1 font-semibold">
                            {dogName(litter.femaleId)}
                            <Heart className="size-3 shrink-0 fill-primary text-primary" />
                            {dogName(litter.maleId)}
                          </span>

                          <span className="font-normal text-muted-foreground">
                            {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {METRIC_ROWS.map((row) => (
                    <TableRow key={row.key}>
                      <TableCell className="font-medium">{row.label}</TableCell>

                      {selectedLitters.map((litter) => {
                        const metrics = metricsByLitterId.get(litter.id);

                        return (
                          <TableCell key={litter.id}>
                            {metrics ? row.format(metrics) : "—"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
