import { Link } from "react-router-dom";

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
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {female?.name ?? "Femelle inconnue"} ❤️{" "}
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

        <div className="flex gap-2">
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
