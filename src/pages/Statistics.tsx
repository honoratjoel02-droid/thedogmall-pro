import { BarChart3, Percent, Wallet, Baby, Tag } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import StatTile from "../components/ui/stat-tile";
import BreakdownBarChart from "../components/statistics/BreakdownBarChart";
import BreedingOutcomeCard from "../components/statistics/BreedingOutcomeCard";

import { useBreedings } from "../hooks/useBreedings";
import { useLitters } from "../hooks/useLitters";
import { useSales } from "../hooks/useSales";
import { useDogs } from "../hooks/useDogs";
import { useClients } from "../hooks/useClients";

import {
  computeAverageIncomePerLitter,
  computeAverageLitterSize,
  computeAveragePuppyPrice,
  computeBreedingOutcomeBreakdown,
  computeBreedingSuccessRate,
  computeDogsByStatus,
  computeTopClients,
} from "../lib/statistics";

function formatFCFA(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export default function Statistics() {
  const { data: breedings = [] } = useBreedings();
  const { data: litters = [] } = useLitters();
  const { data: sales = [] } = useSales();
  const { data: dogs = [] } = useDogs();
  const { data: clients = [] } = useClients();

  const successRate = computeBreedingSuccessRate(breedings);
  const outcomeBreakdown = computeBreedingOutcomeBreakdown(breedings);
  const avgIncomePerLitter = computeAverageIncomePerLitter(litters, sales);
  const avgLitterSize = computeAverageLitterSize(litters);
  const avgPuppyPrice = computeAveragePuppyPrice(sales);
  const dogsByStatus = computeDogsByStatus(dogs);
  const topClients = computeTopClients(clients, sales);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
          <BarChart3 className="size-8 text-primary" />
          Statistiques
        </h1>

        <p className="text-muted-foreground">
          Indicateurs de performance de l'élevage.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile
            label="Taux de réussite"
            value={`${successRate.rate}%`}
            icon={Percent}
            tone="success"
          />

          <StatTile
            label="Revenu / portée"
            value={formatFCFA(avgIncomePerLitter)}
            icon={Wallet}
            tone="primary"
          />

          <StatTile
            label="Taille de portée"
            value={`${avgLitterSize} chiot${avgLitterSize > 1 ? "s" : ""}`}
            icon={Baby}
            tone="neutral"
          />

          <StatTile
            label="Prix moyen / chiot"
            value={formatFCFA(avgPuppyPrice)}
            icon={Tag}
            tone="primary"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <BreedingOutcomeCard
            successful={outcomeBreakdown.successful}
            failed={outcomeBreakdown.failed}
            pending={outcomeBreakdown.pending}
          />

          <BreakdownBarChart
            title="Chiens par statut"
            subtitle="Répartition actuelle de l'élevage"
            data={dogsByStatus}
            emptyMessage="Aucun chien enregistré."
            countLabel="Statut"
            formatCount={(count) => `${count} chien${count > 1 ? "s" : ""}`}
          />

          <BreakdownBarChart
            title="Meilleurs clients"
            subtitle="Par nombre de chiots achetés"
            data={topClients}
            emptyMessage="Aucune vente enregistrée."
            countLabel="Client"
            formatCount={(count) => `${count} achat${count > 1 ? "s" : ""}`}
          />
        </div>
      </div>
    </MainLayout>
  );
}
