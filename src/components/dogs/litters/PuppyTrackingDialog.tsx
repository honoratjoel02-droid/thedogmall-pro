import { useState } from "react";
import { X } from "lucide-react";

import type { CareEntry, Puppy } from "../../../types/models/puppy";
import { useUpdatePuppy } from "../../../hooks/usePuppies";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import WeightGrowthChart from "../../charts/WeightGrowthChart";
import TemperamentTestPanel from "./TemperamentTestPanel";

type Props = {
  puppy: Puppy;
};

function CareChecklist({
  entries,
  onChange,
}: {
  entries: CareEntry[];
  onChange: (entries: CareEntry[]) => void;
}) {
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function addEntry() {
    if (!label.trim()) return;

    onChange([
      ...entries,
      {
        id: crypto.randomUUID(),
        label: label.trim(),
        date: new Date(date).toISOString(),
        done: false,
      },
    ]);

    setLabel("");
  }

  function toggleEntry(id: string) {
    onChange(
      entries.map((entry) =>
        entry.id === id ? { ...entry, done: !entry.done } : entry,
      ),
    );
  }

  function removeEntry(id: string) {
    onChange(entries.filter((entry) => entry.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {entries.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Aucune entrée pour l'instant.
          </p>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-md border px-3 py-2"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={entry.done}
                onChange={() => toggleEntry(entry.id)}
              />

              <span className={entry.done ? "line-through opacity-60" : ""}>
                {entry.label} —{" "}
                {new Date(entry.date).toLocaleDateString("fr-FR")}
              </span>
            </label>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => removeEntry(entry.id)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ex : 1ère injection"
        />

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-40"
        />

        <Button type="button" onClick={addEntry}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}

export default function PuppyTrackingDialog({ puppy }: Props) {
  const [open, setOpen] = useState(false);
  const updatePuppy = useUpdatePuppy();

  const [weightDate, setWeightDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [weightGrams, setWeightGrams] = useState("");

  function addWeight() {
    if (!weightGrams) return;

    updatePuppy.mutate({
      id: puppy.id,
      data: {
        weightHistory: [
          ...puppy.weightHistory,
          {
            date: new Date(weightDate).toISOString(),
            weightGrams: Number(weightGrams),
          },
        ].sort((a, b) => a.date.localeCompare(b.date)),
      },
    });

    setWeightGrams("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline">
            Suivi complet
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Suivi — {puppy.identifier}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="weight">
          <TabsList>
            <TabsTrigger value="weight">Poids</TabsTrigger>
            <TabsTrigger value="vaccinations">Vaccins</TabsTrigger>
            <TabsTrigger value="dewormings">Vermifuges</TabsTrigger>
            <TabsTrigger value="socialization">Socialisation</TabsTrigger>
            <TabsTrigger value="temperament">Tempérament</TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <WeightGrowthChart entries={puppy.weightHistory} />

            <div className="space-y-2">
              {puppy.weightHistory.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucune pesée enregistrée.
                </p>
              )}

              {puppy.weightHistory.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <span>
                    {new Date(entry.date).toLocaleDateString("fr-FR")}
                  </span>

                  <span className="font-medium">{entry.weightGrams} g</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                type="date"
                value={weightDate}
                onChange={(e) => setWeightDate(e.target.value)}
                className="w-40"
              />

              <Input
                type="number"
                min={0}
                placeholder="Poids en g"
                value={weightGrams}
                onChange={(e) => setWeightGrams(e.target.value)}
              />

              <Button type="button" onClick={addWeight}>
                Ajouter
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="vaccinations">
            <CareChecklist
              entries={puppy.vaccinations}
              onChange={(vaccinations) =>
                updatePuppy.mutate({ id: puppy.id, data: { vaccinations } })
              }
            />
          </TabsContent>

          <TabsContent value="dewormings">
            <CareChecklist
              entries={puppy.dewormings}
              onChange={(dewormings) =>
                updatePuppy.mutate({ id: puppy.id, data: { dewormings } })
              }
            />
          </TabsContent>

          <TabsContent value="socialization">
            <CareChecklist
              entries={puppy.socialization}
              onChange={(socialization) =>
                updatePuppy.mutate({ id: puppy.id, data: { socialization } })
              }
            />
          </TabsContent>

          <TabsContent value="temperament">
            <TemperamentTestPanel puppy={puppy} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
