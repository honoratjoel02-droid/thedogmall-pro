import { Download, Users } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import AddClientDialog from "../components/clients/AddClientDialog";
import ClientGrid from "../components/clients/ClientGrid";

import { Button } from "../components/ui/button";

import { useClients } from "../hooks/useClients";
import { downloadCsv, toCsv } from "../lib/csv";
import type { Client } from "../types/models/client";

const CLIENT_COLUMNS = [
  { header: "Prénom", accessor: (c: Client) => c.firstName },
  { header: "Nom", accessor: (c: Client) => c.lastName },
  { header: "Email", accessor: (c: Client) => c.email },
  { header: "Téléphone", accessor: (c: Client) => c.phone },
  { header: "Adresse", accessor: (c: Client) => c.address },
  { header: "Notes", accessor: (c: Client) => c.notes },
];

export default function Clients() {
  const { data: clients = [], isLoading } = useClients();

  function handleExport() {
    downloadCsv("clients.csv", toCsv(clients, CLIENT_COLUMNS));
  }

  return (
    <MainLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
            <Users className="size-8 text-primary" />
            Clients
          </h1>

          <p className="text-muted-foreground">
            Gérez les clients de votre élevage.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={clients.length === 0}
          >
            <Download className="mr-1.5 size-4" />
            Exporter en CSV
          </Button>

          <AddClientDialog />
        </div>
      </div>

      <ClientGrid clients={clients} isLoading={isLoading} />
    </MainLayout>
  );
}
