import type { Breeding } from "../../../types/models/breeding";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface BreedingCardProps {
  breeding: Breeding;
}

export default function BreedingCard({ breeding }: BreedingCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {breeding.femaleId} ❤️ {breeding.maleId}
          </h3>

          <p className="text-sm text-muted-foreground">
            {new Date(breeding.breedingDate).toLocaleDateString("fr-FR")}
          </p>

          <Badge>{breeding.method}</Badge>
        </div>

        <Button variant="outline">Voir</Button>
      </CardContent>
    </Card>
  );
}
