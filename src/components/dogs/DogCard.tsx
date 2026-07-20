import { useNavigate } from "react-router-dom";

import type { Dog } from "../../types/dog";

import EditDogDialog from "./EditDogDialog";
import DeleteDogDialog from "./DeleteDogDialog";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import { calculateAge, formatDate } from "../../lib/date";

interface DogCardProps {
  dog: Dog;
}

function getStatusVariant(status: Dog["status"]) {
  switch (status) {
    case "Disponible":
      return "default";

    case "Gestante":
      return "secondary";

    case "Réservé":
      return "outline";

    case "Retraité":
      return "destructive";

    default:
      return "outline";
  }
}

export default function DogCard({ dog }: DogCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Zone photo */}
      <div className="flex h-52 items-center justify-center bg-muted">
        {dog.photo ? (
          <img
            src={dog.photo}
            alt={dog.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-7xl">🐶</span>
        )}
      </div>

      <CardContent className="space-y-5 p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold">{dog.name}</h3>

          <p className="text-muted-foreground">{dog.breed}</p>
        </div>

        <div className="flex justify-center">
          <Badge variant={getStatusVariant(dog.status)}>{dog.status}</Badge>
        </div>

        <div className="space-y-3 rounded-lg bg-muted/40 p-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sexe</span>
            <span className="font-medium">{dog.sex}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Âge</span>
            <span className="font-medium">{calculateAge(dog.birthDate)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Date de naissance</span>

            <span className="font-medium">{formatDate(dog.birthDate)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Poids</span>
            <span className="font-medium">{dog.weight} kg</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(`/dogs/${dog.id}`)}
          >
            Voir
          </Button>

          <EditDogDialog dog={dog} />

          <DeleteDogDialog dog={dog} />
        </div>
      </CardContent>
    </Card>
  );
}
