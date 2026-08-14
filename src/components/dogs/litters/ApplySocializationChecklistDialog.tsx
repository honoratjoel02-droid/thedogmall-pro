import { useState } from "react";

import type { Puppy } from "../../../types/models/puppy";
import { useApplySocializationChecklist } from "../../../hooks/useSocializationChecklist";
import {
  DEFAULT_SOCIALIZATION_CHECKLIST,
  computeChecklistDate,
} from "../../../lib/socializationChecklist";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

type Props = {
  puppies: Puppy[];
  birthDate: string;
};

export default function ApplySocializationChecklistDialog({ puppies, birthDate }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(
    () => new Set(DEFAULT_SOCIALIZATION_CHECKLIST.map((item) => item.id)),
  );

  const applyChecklist = useApplySocializationChecklist();

  function toggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  async function handleApply() {
    const items = DEFAULT_SOCIALIZATION_CHECKLIST.filter((item) =>
      selectedIds.has(item.id),
    );

    await applyChecklist.mutateAsync({ puppies, items, birthDate });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" disabled={puppies.length === 0}>
            Appliquer la checklist de socialisation
          </Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checklist de socialisation standard</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Les étapes sélectionnées seront ajoutées au suivi de chaque chiot
            de la portée ({puppies.length} chiot{puppies.length > 1 ? "s" : ""}),
            calculées à partir de la date de naissance. Les étapes déjà
            présentes ne sont pas dupliquées.
          </p>

          <div className="space-y-2">
            {DEFAULT_SOCIALIZATION_CHECKLIST.map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggle(item.id)}
                    className="size-4 accent-primary"
                  />
                  {item.label}
                </span>

                <span className="shrink-0 text-muted-foreground">
                  {new Date(computeChecklistDate(birthDate, item.ageDays)).toLocaleDateString(
                    "fr-FR",
                  )}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleApply}
              disabled={applyChecklist.isPending || selectedIds.size === 0}
            >
              {applyChecklist.isPending ? "Application..." : "Appliquer à la portée"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
