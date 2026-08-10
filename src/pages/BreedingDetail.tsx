import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import PregnancyCard from "../components/dogs/reproduction/PregnancyCard";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

import { useBreeding, useUpdateBreeding } from "../hooks/useBreedings";
import { useDogs } from "../hooks/useDogs";
import {
  useCreatePregnancy,
  usePregnancyByBreeding,
} from "../hooks/usePregnancies";

import { calculateExpectedBirthDate } from "../domain/calculations/calculateExpectedBirthDate";
import { calculateUltrasoundDate } from "../domain/calculations/calculateUltrasoundDate";
import { calculateXRayDate } from "../domain/calculations/calculateXRayDate";

import type { BreedingStatus } from "../types/models/breeding";

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

export default function BreedingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: breeding, isLoading } = useBreeding(id);
  const { data: dogs = [] } = useDogs();
  const { data: pregnancy } = usePregnancyByBreeding(id);

  const updateBreeding = useUpdateBreeding();
  const createPregnancy = useCreatePregnancy();

  const [isConfirming, setIsConfirming] = useState(false);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          Chargement...
        </div>
      </MainLayout>
    );
  }

  if (!breeding) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Saillie introuvable</h1>
          <Button onClick={() => navigate("/breeding")}>Retour</Button>
        </div>
      </MainLayout>
    );
  }

  const female = dogs.find((dog) => dog.id === breeding.femaleId);
  const male = dogs.find((dog) => dog.id === breeding.maleId);

  async function handleConfirmGestation() {
    setIsConfirming(true);

    try {
      await createPregnancy.mutateAsync({
        breedingId: breeding!.id,
        femaleId: breeding!.femaleId,
        expectedBirthDate: calculateExpectedBirthDate(
          breeding!.breedingDate,
        ).toISOString(),
        ultrasoundDate: calculateUltrasoundDate(
          breeding!.breedingDate,
        ).toISOString(),
        xrayDate: calculateXRayDate(breeding!.breedingDate).toISOString(),
        status: "En cours",
      });

      await updateBreeding.mutateAsync({
        id: breeding!.id,
        data: { status: "Gestation confirmée" },
      });
    } finally {
      setIsConfirming(false);
    }
  }

  async function handleMarkFailed() {
    await updateBreeding.mutateAsync({
      id: breeding!.id,
      data: { status: "Échec" },
    });
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <Button variant="ghost" onClick={() => navigate("/breeding")}>
          ← Retour
        </Button>

        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold sm:text-3xl">
                {female?.name ?? "Femelle inconnue"}
                <Heart className="size-5 shrink-0 fill-primary text-primary" />
                {male?.name ?? "Mâle inconnu"}
              </h1>

              <Badge variant={STATUS_VARIANT[breeding.status]}>
                {breeding.status}
              </Badge>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <p>
                <strong>Date de la saillie :</strong>{" "}
                {new Date(breeding.breedingDate).toLocaleDateString("fr-FR")}
              </p>

              <p>
                <strong>Méthode :</strong> {breeding.method}
              </p>
            </div>

            {breeding.notes && (
              <p>
                <strong>Notes :</strong> {breeding.notes}
              </p>
            )}

            {breeding.status === "En cours" && (
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  onClick={handleConfirmGestation}
                  disabled={isConfirming}
                >
                  {isConfirming
                    ? "Confirmation..."
                    : "Confirmer la gestation"}
                </Button>

                <Button variant="destructive" onClick={handleMarkFailed}>
                  Marquer comme échec
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {pregnancy && <PregnancyCard pregnancy={pregnancy} />}

        {breeding.status === "Terminée" && (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Mise bas enregistrée. Le module Portées (gestion des chiots et
              réservations) arrive dans une prochaine étape.
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
