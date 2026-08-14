import { Link } from "react-router-dom";
import { Baby, GitCompare } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import AddLitterDialog from "../components/dogs/litters/AddLitterDialog";
import LitterCard from "../components/dogs/litters/LitterCard";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

import { useLitters } from "../hooks/useLitters";

export default function Litters() {
  const { data: litters = [], isLoading } = useLitters();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
              <Baby className="size-8 text-primary" />
              Portées
            </h1>

            <p className="text-muted-foreground">
              Gérez les portées, les chiots et leurs réservations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              render={(props) => (
                <Link {...props} to="/litters/compare">
                  <GitCompare className="mr-1.5 size-4" />
                  Comparer les portées
                </Link>
              )}
            />

            <AddLitterDialog />
          </div>
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
