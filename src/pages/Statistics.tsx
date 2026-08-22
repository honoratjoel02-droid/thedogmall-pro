import { BarChart3, Download, Percent, Wallet, Baby, Tag } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import StatTile from "../components/ui/stat-tile";
import BreakdownBarChart from "../components/statistics/BreakdownBarChart";
import BreedingOutcomeCard from "../components/statistics/BreedingOutcomeCard";
import AnnualGoalsSection from "../components/statistics/AnnualGoalsSection";

import { Button } from "../components/ui/button";

import { useBreedings } from "../hooks/useBreedings";
import { useLitters } from "../hooks/useLitters";
import { useSales } from "../hooks/useSales";
import { useIncomes } from "../hooks/useIncomes";
import { useDogs } from "../hooks/useDogs";
import { useClients } from "../hooks/useClients";
import { usePuppies } from "../hooks/usePuppies";

import {
  computeAverageIncomePerLitter,
  computeAverageLitterSize,
  computeAveragePuppyPrice,
  computeBreedingOutcomeBreakdown,
  computeBreedingSuccessRate,
  computeDogsByStatus,
  computeTopClients,
} from "../lib/statistics";
import { downloadCsv, toCsv } from "../lib/csv";
import { getBalanceDue, getTotalPaid } from "../lib/payments";
import type { Sale } from "../types/models/sale";
import type { Client } from "../types/models/client";
import type { Puppy } from "../types/models/puppy";

function formatFCFA(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export default function Statistics() {
  const { data: breedings = [] } = useBreedings();
  const { data: litters = [] } = useLitters();
  const { data: sales = [] } = useSales();
  const { data: incomes = [] } = useIncomes();
  const { data: dogs = [] } = useDogs();
  const { data: clients = [] } = useClients();
  const { data: puppies = [] } = usePuppies();

  const successRate = computeBreedingSuccessRate(breedings);
  const outcomeBreakdown = computeBreedingOutcomeBreakdown(breedings);
  const avgIncomePerLitter = computeAverageIncomePerLitter(litters, sales);
  const avgLitterSize = computeAverageLitterSize(litters);
  const avgPuppyPrice = computeAveragePuppyPrice(sales);
  const dogsByStatus = computeDogsByStatus(dogs);
  const topClients = computeTopClients(clients, sales);

  function handleExportSales() {
    const clientsById = new Map<string, Client>(clients.map((c) => [c.id, c]));
    const puppiesById = new Map<string, Puppy>(puppies.map((p) => [p.id, p]));

    const columns = [
      {
        header: "Chiot",
        accessor: (s: Sale) => puppiesById.get(s.puppyId)?.identifier ?? "",
      },
      {
        header: "Client",
        accessor: (s: Sale) => {
          const client = clientsById.get(s.clientId);
          return client ? `${client.firstName} ${client.lastName}` : "";
        },
      },
      {
        header: "Date de vente",
        accessor: (s: Sale) => new Date(s.saleDate).toLocaleDateString("fr-FR"),
      },
      { header: "Prix (FCFA)", accessor: (s: Sale) => s.price },
      { header: "Payé (FCFA)", accessor: (s: Sale) => getTotalPaid(s) },
      { header: "Solde dû (FCFA)", accessor: (s: Sale) => getBalanceDue(s) },
      {
        header: "Contrat signé",
        accessor: (s: Sale) => (s.contractSigned ? "Oui" : "Non"),
      },
    ];

    downloadCsv("ventes.csv", toCsv(sales, columns));
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <PageHeader
          icon={BarChart3}
          title="Statistiques"
          description="Indicateurs de performance de l'élevage."
          actions={
            <Button
              variant="outline"
              onClick={handleExportSales}
              disabled={sales.length === 0}
            >
              <Download className="mr-1.5 size-4" />
              Exporter les ventes en CSV
            </Button>
          }
        />
      </div>

      <div className="space-y-6">
        <AnnualGoalsSection litters={litters} incomes={incomes} sales={sales} />

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
