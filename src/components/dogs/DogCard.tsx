import { Mars, Venus, Cake, Scale } from "lucide-react";

import type { Dog } from "../../types/dog";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { getAgeLabel, getInitials } from "../../lib/utils";

const statusVariant: Record<Dog["status"], "default" | "secondary" | "outline" | "destructive"> = {
  Disponible: "secondary",
  Réservé: "outline",
  Gestante: "default",
  Retraité: "outline",
};

type DogCardProps = {
  dog: Dog;
};

export default function DogCard({ dog }: DogCardProps) {
  const SexIcon = dog.sex === "Mâle" ? Mars : Venus;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-primary/15 via-accent to-primary/5">
        <span className="text-3xl font-semibold text-primary/70">
          {getInitials(dog.name)}
        </span>
        <Badge
          variant={statusVariant[dog.status]}
          className="absolute top-2 right-2"
        >
          {dog.status}
        </Badge>
      </div>

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">
            {dog.name}
          </h3>
          <span
            className={`flex size-6 items-center justify-center rounded-full ${
              dog.sex === "Mâle"
                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            }`}
          >
            <SexIcon className="size-3.5" />
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {dog.breed} · {dog.color}
        </p>

        <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Cake className="size-3.5" />
            {getAgeLabel(dog.birthDate)}
          </span>
          <span className="flex items-center gap-1">
            <Scale className="size-3.5" />
            {dog.weight} kg
          </span>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2 bg-transparent px-4 py-3">
        <button className="text-xs font-medium text-primary hover:underline">
          Voir la fiche
        </button>
      </CardFooter>
    </Card>
  );
}
