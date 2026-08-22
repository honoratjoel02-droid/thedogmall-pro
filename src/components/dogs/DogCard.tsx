import { useNavigate } from "react-router-dom";
import { Dog as DogIcon } from "lucide-react";

import type { Dog } from "../../types/dog";
import { useDogPhotosByDog } from "../../hooks/useDogPhotos";
import { getCurrentWeightKg } from "../../lib/weight";

import EditDogDialog from "./EditDogDialog";
import DeleteDogDialog from "./DeleteDogDialog";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

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
  const { data: photos = [] } = useDogPhotosByDog(dog.id);
  const primaryPhoto = photos[0];

  return (
    <Card variant="interactive">
      <CardContent className="p-6">
        <div className="mb-5 flex justify-center">
          {primaryPhoto ? (
            <img
              src={primaryPhoto.dataUrl}
              alt={dog.name}
              className="h-24 w-24 rounded-full object-cover ring-1 ring-foreground/[0.06]"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
              <DogIcon className="size-10" />
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold">{dog.name}</h3>

          <p className="text-sm text-muted-foreground">{dog.breed}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sexe</span>
            <span className="font-medium">{dog.sex}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Poids</span>
            <span className="font-medium">{getCurrentWeightKg(dog)} kg</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Date de naissance</span>

            <span className="font-medium">
              {new Date(dog.birthDate).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          <Badge variant={getStatusVariant(dog.status)}>{dog.status}</Badge>

          {dog.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
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
