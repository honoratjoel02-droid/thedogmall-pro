import { useState } from "react";

import type { Dog } from "../../../types/dog";
import { useUpdateDog } from "../../../hooks/useDogs";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import WeightGrowthChart from "../../charts/WeightGrowthChart";

type Props = {
  dog: Dog;
};

export default function DogWeightTracking({ dog }: Props) {
  const updateDog = useUpdateDog();

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [weightKg, setWeightKg] = useState("");

  function addWeight() {
    if (!weightKg) return;

    updateDog.mutate({
      id: dog.id,
      data: {
        weightHistory: [
          ...dog.weightHistory,
          {
            date: new Date(date).toISOString(),
            weightGrams: Math.round(Number(weightKg) * 1000),
          },
        ].sort((a, b) => a.date.localeCompare(b.date)),
      },
    });

    setWeightKg("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi du poids</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <WeightGrowthChart
          entries={dog.weightHistory}
          title="Évolution du poids"
          ariaLabel={`Évolution du poids de ${dog.name}`}
        />

        <div className="space-y-2">
          {dog.weightHistory.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucune pesée enregistrée.
            </p>
          )}

          {[...dog.weightHistory]
            .reverse()
            .map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span>{new Date(entry.date).toLocaleDateString("fr-FR")}</span>

                <span className="font-medium">
                  {(entry.weightGrams / 1000).toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  kg
                </span>
              </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40"
          />

          <Input
            type="number"
            min={0}
            step="0.1"
            placeholder="Poids en kg"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />

          <Button type="button" onClick={addWeight}>
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
