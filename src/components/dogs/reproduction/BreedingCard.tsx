import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import type { Breeding, BreedingStatus } from "../../../types/models/breeding";
import { useDogs } from "../../../hooks/useDogs";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface BreedingCardProps {
  breeding: Breeding;
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

export default function BreedingCard({ breeding }: BreedingCardProps) {
  const { data: dogs = [] } = useDogs();

  const female = dogs.find((dog) => dog.id === breeding.femaleId);
  const male = dogs.find((dog) => dog.id === breeding.maleId);

  return (
    <Card variant="interactive">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="flex items-center gap-1.5 text-lg font-semibold">
            {female?.name ?? "Femelle inconnue"}
            <Heart className="size-4 shrink-0 fill-primary text-primary" />
            {male?.name ?? "Mâle inconnu"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {new Date(breeding.breedingDate).toLocaleDateString("fr-FR")}
          </p>

          <div className="flex gap-2">
            <Badge variant="secondary">{breeding.method}</Badge>
            <Badge variant={STATUS_VARIANT[breeding.status]}>
              {breeding.status}
            </Badge>
          </div>
        </div>

        <Button variant="outline" render={(props) => (
          <Link {...props} to={`/breeding/${breeding.id}`}>
            Voir
          </Link>
        )} />
      </CardContent>
    </Card>
  );
}
