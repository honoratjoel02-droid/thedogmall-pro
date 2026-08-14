// src/components/dogs/profile/DogBreedingTab.tsx

import { Link } from "react-router-dom";

import type { Dog } from "../../../types/dog";
import type { BreedingStatus } from "../../../types/models/breeding";
import { useBreedings } from "../../../hooks/useBreedings";
import { useHeatCyclesByDog } from "../../../hooks/useHeatCycles";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

import NextHeatEstimate from "../reproduction/NextHeatEstimate";
import AddHeatCycleDialog from "../reproduction/AddHeatCycleDialog";
import HeatCycleList from "../reproduction/HeatCycleList";

interface DogBreedingTabProps {
  dog: Dog;
}

const STATUS_VARIANT: Record<
  BreedingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Planifiée: "outline",
  "En cours": "secondary",
  "Gestation confirmée": "default",
  Échec: "destructive",
  Terminée: "outline",
};

export default function DogBreedingTab({ dog }: DogBreedingTabProps) {
  const { data: breedings = [], isLoading } = useBreedings();
  const { data: heatCycles = [], isLoading: isLoadingHeatCycles } =
    useHeatCyclesByDog(dog.sex === "Femelle" ? dog.id : undefined);

  const dogBreedings = breedings.filter(
    (breeding) => breeding.femaleId === dog.id || breeding.maleId === dog.id,
  );

  return (
    <div className="space-y-6">
      {dog.sex === "Femelle" && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Chaleurs</h3>

            <AddHeatCycleDialog dogId={dog.id} />
          </div>

          <NextHeatEstimate cycles={heatCycles} />

          <HeatCycleList cycles={heatCycles} isLoading={isLoadingHeatCycles} />
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold">Saillies</h3>

        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              Chargement...
            </CardContent>
          </Card>
        ) : dogBreedings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Aucune saillie enregistrée pour {dog.name}.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {dogBreedings.map((breeding) => (
              <Card key={breeding.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {new Date(breeding.breedingDate).toLocaleDateString(
                        "fr-FR",
                      )}
                    </p>

                    <Badge variant={STATUS_VARIANT[breeding.status]}>
                      {breeding.status}
                    </Badge>
                  </div>

                  <Button
                    variant="outline"
                    render={(props) => (
                      <Link {...props} to={`/breeding/${breeding.id}`}>
                        Voir
                      </Link>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
