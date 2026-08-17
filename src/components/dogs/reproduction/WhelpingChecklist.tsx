import { useState } from "react";
import { X } from "lucide-react";

import type { Pregnancy } from "../../../types/models/pregnancy";
import { useUpdatePregnancy } from "../../../hooks/usePregnancies";
import {
  DEFAULT_WHELPING_CHECKLIST,
  mergeWhelpingChecklist,
} from "../../../lib/whelpingChecklist";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

type Props = {
  pregnancy: Pregnancy;
};

export default function WhelpingChecklist({ pregnancy }: Props) {
  const updatePregnancy = useUpdatePregnancy();

  const [label, setLabel] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const entries = pregnancy.whelpingChecklist ?? [];

  const daysUntil = Math.floor(
    (new Date(pregnancy.expectedBirthDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const remainingCount = entries.filter((entry) => !entry.done).length;

  function save(next: typeof entries) {
    updatePregnancy.mutate({
      id: pregnancy.id,
      data: { whelpingChecklist: next },
    });
  }

  function generate() {
    save(
      mergeWhelpingChecklist(
        entries,
        DEFAULT_WHELPING_CHECKLIST,
        pregnancy.expectedBirthDate,
      ),
    );
  }

  function addEntry() {
    if (!label.trim()) return;

    save([
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
    save(
      entries.map((entry) =>
        entry.id === id ? { ...entry, done: !entry.done } : entry,
      ),
    );
  }

  function removeEntry(id: string) {
    save(entries.filter((entry) => entry.id !== id));
  }

  const urgent = daysUntil <= 14 && remainingCount > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Checklist de mise bas</CardTitle>

        {entries.length > 0 && (
          <span
            className={`text-sm ${urgent ? "font-medium text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}
          >
            {remainingCount === 0
              ? "Tout est prêt"
              : `${remainingCount} étape${remainingCount > 1 ? "s" : ""} restante${remainingCount > 1 ? "s" : ""}`}
          </span>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {entries.length === 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Générez une checklist de préparation à la mise bas, avec des
              étapes réparties dans les jours précédant la date prévue.
            </p>

            <Button type="button" onClick={generate}>
              Générer la checklist de mise bas
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
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
        )}

        <div className="flex gap-2">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex : Prévenir la famille d'accueil"
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
      </CardContent>
    </Card>
  );
}
