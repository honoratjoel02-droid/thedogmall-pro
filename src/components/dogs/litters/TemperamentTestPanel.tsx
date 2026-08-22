import type { Puppy, TemperamentTestItem } from "../../../types/models/puppy";
import { useUpdatePuppy } from "../../../hooks/usePuppies";
import {
  TEMPERAMENT_PROFILE_DESCRIPTIONS,
  TEMPERAMENT_SCORE_LABELS,
  VOLHARD_TEMPERAMENT_TEST,
  computeTemperamentProfile,
  createEmptyTemperamentTest,
} from "../../../lib/temperamentTest";

import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

type Props = {
  puppy: Puppy;
};

export default function TemperamentTestPanel({ puppy }: Props) {
  const updatePuppy = useUpdatePuppy();

  const test = puppy.temperamentTest;

  function save(items: TemperamentTestItem[], notes?: string) {
    updatePuppy.mutate({
      id: puppy.id,
      data: {
        temperamentTest: {
          date: test?.date ?? new Date().toISOString(),
          items,
          notes: notes ?? test?.notes,
        },
      },
    });
  }

  function start() {
    save(createEmptyTemperamentTest().items, "");
  }

  function setScore(itemId: string, score: number) {
    if (!test) return;

    save(
      test.items.map((item) =>
        item.id === itemId ? { ...item, score } : item,
      ),
      test.notes,
    );
  }

  function setNotes(notes: string) {
    if (!test) return;

    save(test.items, notes);
  }

  if (!test) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Réalisez le test d'évaluation comportementale (type Volhard),
          idéalement vers 7 semaines, dans un lieu neutre et calme.
        </p>

        <Button type="button" onClick={start}>
          Démarrer le test comportemental
        </Button>
      </div>
    );
  }

  const profile = computeTemperamentProfile(test.items);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Test réalisé le {new Date(test.date).toLocaleDateString("fr-FR")}
      </p>

      <div className="space-y-3">
        {VOLHARD_TEMPERAMENT_TEST.map((definition) => {
          const item = test.items.find((i) => i.id === definition.id);
          const score = item?.score ?? 0;

          return (
            <div key={definition.id} className="rounded-md border px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{definition.label}</span>

                <select
                  value={score}
                  onChange={(e) =>
                    setScore(definition.id, Number(e.target.value))
                  }
                  className="rounded-md border bg-background px-2 py-1 text-sm"
                >
                  <option value={0}>Non évalué</option>
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {TEMPERAMENT_SCORE_LABELS[value]}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {definition.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="temperament-notes">
          Notes
        </label>

        <textarea
          id="temperament-notes"
          value={test.notes ?? ""}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          rows={3}
          placeholder="Observations complémentaires..."
        />
      </div>

      {profile && (
        <div className="flex items-start gap-2 rounded-md border px-3 py-2">
          <Badge>{profile}</Badge>

          <p className="text-sm text-muted-foreground">
            {TEMPERAMENT_PROFILE_DESCRIPTIONS[profile]}
          </p>
        </div>
      )}
    </div>
  );
}
