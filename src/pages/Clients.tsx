import { useMemo, useState } from "react";
import { Download, Search, Users } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import AddClientDialog from "../components/clients/AddClientDialog";
import ClientGrid from "../components/clients/ClientGrid";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { useClients } from "../hooks/useClients";
import { downloadCsv, toCsv } from "../lib/csv";
import type { Client } from "../types/models/client";

const CLIENT_COLUMNS = [
  { header: "Prénom", accessor: (c: Client) => c.firstName },
  { header: "Nom", accessor: (c: Client) => c.lastName },
  { header: "Email", accessor: (c: Client) => c.email },
  { header: "Téléphone", accessor: (c: Client) => c.phone },
  { header: "Adresse", accessor: (c: Client) => c.address },
  { header: "Étiquettes", accessor: (c: Client) => (c.tags ?? []).join(", ") },
  { header: "Notes", accessor: (c: Client) => c.notes },
];

export default function Clients() {
  const { data: clients = [], isLoading } = useClients();

  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const tags = useMemo(() => {
    return [...new Set(clients.flatMap((c) => c.tags ?? []))].sort();
  }, [clients]);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(search.toLowerCase());
      const matchesTag = tag === "" || (client.tags ?? []).includes(tag);

      return matchesSearch && matchesTag;
    });
  }, [clients, search, tag]);

  function handleExport() {
    downloadCsv("clients.csv", toCsv(filteredClients, CLIENT_COLUMNS));
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
            disabled={filteredClients.length === 0}
          >
            <Download className="mr-1.5 size-4" />
            Exporter en CSV
          </Button>

          <AddClientDialog />
        </div>
      </div>

      <div className="mb-6 space-y-4 rounded-lg border p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Rechercher un client..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <select
            className="rounded-md border bg-background px-3 py-2"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">Toutes les étiquettes</option>

            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-muted-foreground">
            {filteredClients.length} client{filteredClients.length > 1 ? "s" : ""}{" "}
            trouvé{filteredClients.length > 1 ? "s" : ""}
          </span>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setTag("");
            }}
            className="rounded-md border px-4 py-2 text-sm transition hover:bg-muted"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      <ClientGrid clients={filteredClients} isLoading={isLoading} />
    </MainLayout>
  );
}
