import { Link } from "react-router-dom";
import { Baby, GitCompare } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import AddLitterDialog from "../components/dogs/litters/AddLitterDialog";
import LitterCard from "../components/dogs/litters/LitterCard";

import { Button } from "../components/ui/button";
import EmptyState from "../components/ui/empty-state";
import LoadingState from "../components/ui/loading-state";

import { useLitters } from "../hooks/useLitters";

export default function Litters() {
  const { data: litters = [], isLoading } = useLitters();

  return (
    <MainLayout>
      <div className="space-y-8">
        <PageHeader
          icon={Baby}
          title="Portées"
          description="Gérez les portées, les chiots et leurs réservations."
          actions={
            <>
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
            </>
          }
        />

        {isLoading && <LoadingState rows={3} />}

        {!isLoading && litters.length === 0 && (
          <EmptyState
            icon={Baby}
            label={
              'Aucune portée enregistrée. Une fois qu\'une gestation est marquée "Terminée" dans le module Reproduction, vous pouvez créer sa portée ici.'
            }
          />
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
