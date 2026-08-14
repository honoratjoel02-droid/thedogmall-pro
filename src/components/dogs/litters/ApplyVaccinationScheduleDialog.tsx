import { useState } from "react";

import type { Puppy } from "../../../types/models/puppy";
import { useApplyVaccinationSchedule } from "../../../hooks/useVaccinationSchedule";
import {
  DEFAULT_VACCINATION_SCHEDULE,
  computeScheduleDate,
} from "../../../lib/vaccinationSchedule";

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

export default function ApplyVaccinationScheduleDialog({ puppies, birthDate }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(
    () => new Set(DEFAULT_VACCINATION_SCHEDULE.map((item) => item.id)),
  );

  const applySchedule = useApplyVaccinationSchedule();

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
    const items = DEFAULT_VACCINATION_SCHEDULE.filter((item) =>
      selectedIds.has(item.id),
    );

    await applySchedule.mutateAsync({ puppies, items, birthDate });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" disabled={puppies.length === 0}>
            Appliquer le calendrier vaccinal
          </Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calendrier vaccinal standard</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Les rappels sélectionnés seront ajoutés au suivi de chaque chiot de
            la portée ({puppies.length} chiot{puppies.length > 1 ? "s" : ""}),
            calculés à partir de la date de naissance. Les rappels déjà
            présents ne sont pas dupliqués.
          </p>

          <div className="space-y-2">
            {DEFAULT_VACCINATION_SCHEDULE.map((item) => (
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

                <span className="text-muted-foreground">
                  {new Date(computeScheduleDate(birthDate, item.ageDays)).toLocaleDateString(
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
              disabled={applySchedule.isPending || selectedIds.size === 0}
            >
              {applySchedule.isPending ? "Application..." : "Appliquer à la portée"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
