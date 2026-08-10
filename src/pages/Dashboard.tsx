import { Link } from "react-router-dom";
import { LayoutDashboard, Dog, Users, Heart, Baby } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import StatTile from "../components/ui/stat-tile";

import { useDogs } from "../hooks/useDogs";
import { useClients } from "../hooks/useClients";
import { useBreedings } from "../hooks/useBreedings";
import { useLitters } from "../hooks/useLitters";

export default function Dashboard() {
  const { data: dogs = [] } = useDogs();
  const { data: clients = [] } = useClients();
  const { data: breedings = [] } = useBreedings();
  const { data: litters = [] } = useLitters();

  const ongoingBreedings = breedings.filter(
    (b) => b.status === "En cours" || b.status === "Gestation confirmée",
  ).length;

  const recentLitters = [...litters]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  const recentClients = [...clients]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  return (
    <MainLayout>
      <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold sm:text-4xl">
        <LayoutDashboard className="size-8 text-primary" />
        Tableau de bord
      </h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Chiens" value={dogs.length} icon={Dog} />
        <StatTile
          label="Clients"
          value={clients.length}
          icon={Users}
          tone="neutral"
        />
        <StatTile
          label="Gestations en cours"
          value={ongoingBreedings}
          icon={Heart}
          tone="danger"
        />
        <StatTile
          label="Portées"
          value={litters.length}
          icon={Baby}
          tone="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Dernières portées</h2>

              <Button
                variant="ghost"
                size="sm"
                render={(props) => (
                  <Link {...props} to="/litters">
                    Voir tout
                  </Link>
                )}
              />
            </div>

            {recentLitters.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Aucune portée enregistrée pour l'instant.
              </p>
            ) : (
              <ul className="space-y-1">
                {recentLitters.map((litter) => {
                  const female = dogs.find((d) => d.id === litter.femaleId);
                  const male = dogs.find((d) => d.id === litter.maleId);

                  return (
                    <li key={litter.id}>
                      <Link
                        to={`/litters/${litter.id}`}
                        className="flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          {female?.name ?? "Femelle"}
                          <Heart className="size-3.5 shrink-0 fill-primary text-primary" />
                          {male?.name ?? "Mâle"}
                        </span>

                        <span className="text-muted-foreground">
                          {new Date(litter.birthDate).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Derniers clients</h2>

              <Button
                variant="ghost"
                size="sm"
                render={(props) => (
                  <Link {...props} to="/clients">
                    Voir tout
                  </Link>
                )}
              />
            </div>

            {recentClients.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Aucun client enregistré pour l'instant.
              </p>
            ) : (
              <ul className="space-y-1">
                {recentClients.map((client) => (
                  <li key={client.id}>
                    <Link
                      to={`/clients/${client.id}`}
                      className="flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      <span className="font-medium">
                        {client.firstName} {client.lastName}
                      </span>

                      <span className="text-muted-foreground">
                        {client.email ?? client.phone ?? ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
