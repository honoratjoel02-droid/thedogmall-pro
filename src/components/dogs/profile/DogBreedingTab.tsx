// src/components/dogs/profile/DogBreedingTab.tsx

import { Link } from "react-router-dom";

import type { Dog } from "../../../types/dog";
import type { BreedingStatus } from "../../../types/models/breeding";
import { useBreedings } from "../../../hooks/useBreedings";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

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

  const dogBreedings = breedings.filter(
    (breeding) => breeding.femaleId === dog.id || breeding.maleId === dog.id,
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-muted-foreground">
          Chargement...
        </CardContent>
      </Card>
    );
  }

  if (dogBreedings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Aucune saillie enregistrée pour {dog.name}.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {dogBreedings.map((breeding) => (
        <Card key={breeding.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {new Date(breeding.breedingDate).toLocaleDateString("fr-FR")}
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
  );
}
