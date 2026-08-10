import MainLayout from "../components/layout/MainLayout";
import AddLitterDialog from "../components/dogs/litters/AddLitterDialog";
import LitterCard from "../components/dogs/litters/LitterCard";

import { Card, CardContent } from "../components/ui/card";

import { useLitters } from "../hooks/useLitters";

export default function Litters() {
  const { data: litters = [], isLoading } = useLitters();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">🐾 Portées</h1>

            <p className="text-muted-foreground">
              Gérez les portées, les chiots et leurs réservations.
            </p>
          </div>

          <AddLitterDialog />
        </div>

        {isLoading && (
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            Chargement...
          </div>
        )}

        {!isLoading && litters.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Aucune portée enregistrée. Une fois qu'une gestation est
              marquée "Terminée" dans le module Reproduction, vous pouvez
              créer sa portée ici.
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {litters.map((litter) => (
            <LitterCard key={litter.id} litter={litter} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
