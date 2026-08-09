import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import AddPuppyDialog from "../components/dogs/litters/AddPuppyDialog";
import PuppyCard from "../components/dogs/litters/PuppyCard";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

import { useLitter } from "../hooks/useLitters";
import { usePuppiesByLitter } from "../hooks/usePuppies";
import { useDogs } from "../hooks/useDogs";

export default function LitterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: litter, isLoading } = useLitter(id);
  const { data: puppies = [] } = usePuppiesByLitter(id);
  const { data: dogs = [] } = useDogs();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          Chargement...
        </div>
      </MainLayout>
    );
  }

  if (!litter) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Portée introuvable</h1>
          <Button onClick={() => navigate("/litters")}>Retour</Button>
        </div>
      </MainLayout>
    );
  }

  const female = dogs.find((dog) => dog.id === litter.femaleId);
  const male = dogs.find((dog) => dog.id === litter.maleId);

  const available = puppies.filter((p) => p.status === "Disponible").length;
  const reserved = puppies.filter((p) => p.status === "Réservé").length;
  const sold = puppies.filter((p) => p.status === "Vendu").length;

  return (
    <MainLayout>
      <div className="space-y-8">
        <Button variant="ghost" onClick={() => navigate("/litters")}>
          ← Retour
        </Button>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h1 className="text-3xl font-bold">
              {female?.name ?? "Femelle inconnue"} ❤️{" "}
              {male?.name ?? "Mâle inconnu"}
            </h1>

            <p className="text-muted-foreground">
              Née le {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {litter.puppiesCount} chiots au total
              </Badge>
              <Badge variant="outline">{available} disponibles</Badge>
              <Badge variant="outline">{reserved} réservés</Badge>
              <Badge variant="outline">{sold} vendus</Badge>
            </div>

            {litter.notes && (
              <p>
                <strong>Notes :</strong> {litter.notes}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Chiots</h2>

          <AddPuppyDialog litterId={litter.id} />
        </div>

        {puppies.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Aucun chiot enregistré pour cette portée.
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {puppies.map((puppy) => (
            <PuppyCard key={puppy.id} puppy={puppy} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
