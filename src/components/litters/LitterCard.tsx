import type { Litter } from "../../types/models/litter";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Props {
  litter: Litter;
}

function getStatusVariant(
  status: Litter["status"],
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "En cours":
      return "default";

    case "Disponible":
      return "secondary";

    case "Clôturée":
      return "outline";

    default:
      return "secondary";
  }
}

export default function LitterCard({ litter }: Props) {
  const total = litter.maleCount + litter.femaleCount;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">🐶 Portée</h2>

            <p className="text-sm text-muted-foreground">
              {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
            </p>
          </div>

          <Badge variant={getStatusVariant(litter.status)}>
            {litter.status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{total}</p>

            <p className="text-sm text-muted-foreground">Total</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold">♂ {litter.maleCount}</p>

            <p className="text-sm text-muted-foreground">Mâles</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold">♀ {litter.femaleCount}</p>

            <p className="text-sm text-muted-foreground">Femelles</p>
          </div>
        </div>

        {litter.notes && (
          <div>
            <p className="font-medium">Observations</p>

            <p className="text-sm text-muted-foreground">{litter.notes}</p>
          </div>
        )}

        <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
          <Button variant="outline" size="sm">
            👁 Voir
          </Button>

          <Button variant="secondary" size="sm">
            ✏ Modifier
          </Button>

          <Button variant="destructive" size="sm">
            🗑 Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
