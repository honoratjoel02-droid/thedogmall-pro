import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import type { Litter } from "../../../types/models/litter";
import { useDogs } from "../../../hooks/useDogs";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

import EditLitterDialog from "./EditLitterDialog";
import DeleteLitterDialog from "./DeleteLitterDialog";

interface LitterCardProps {
  litter: Litter;
}

export default function LitterCard({ litter }: LitterCardProps) {
  const { data: dogs = [] } = useDogs();

  const female = dogs.find((dog) => dog.id === litter.femaleId);
  const male = dogs.find((dog) => dog.id === litter.maleId);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="flex items-center gap-1.5 text-lg font-semibold">
            {female?.name ?? "Femelle inconnue"}
            <Heart className="size-4 shrink-0 fill-primary text-primary" />
            {male?.name ?? "Mâle inconnu"}
          </h3>

          <p className="text-sm text-muted-foreground">
            Née le {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
          </p>

          <div className="flex gap-2">
            <Badge variant="secondary">{litter.puppiesCount} chiots</Badge>
            <Badge variant="outline">{litter.malesCount} mâles</Badge>
            <Badge variant="outline">{litter.femalesCount} femelles</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            render={(props) => (
              <Link {...props} to={`/litters/${litter.id}`}>
                Voir
              </Link>
            )}
          />

          <EditLitterDialog litter={litter} />

          <DeleteLitterDialog litter={litter} />
        </div>
      </CardContent>
    </Card>
  );
}
