import { useState } from "react";

import type { WaitlistEntry } from "../../../types/models/waitlistEntry";
import { usePuppiesByLitter } from "../../../hooks/usePuppies";
import { useConvertWaitlistEntry } from "../../../hooks/useWaitlist";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";

type Props = {
  entry: WaitlistEntry;
};

export default function ConvertWaitlistEntryDialog({ entry }: Props) {
  const [open, setOpen] = useState(false);
  const [puppyId, setPuppyId] = useState("");
  const [error, setError] = useState("");

  const { data: puppies = [] } = usePuppiesByLitter(entry.litterId);
  const convertEntry = useConvertWaitlistEntry();

  const availablePuppies = puppies.filter((p) => p.status === "Disponible");

  async function handleConvert() {
    if (!puppyId) {
      setError("Sélectionnez le chiot à réserver.");
      return;
    }

    setError("");

    await convertEntry.mutateAsync({ entry, puppyId });

    setPuppyId("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" size="sm">
            Convertir en réservation
          </Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convertir en réservation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="waitlistPuppy">Chiot à réserver</Label>

            {availablePuppies.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun chiot disponible dans cette portée pour le moment.
              </p>
            ) : (
              <select
                id="waitlistPuppy"
                value={puppyId}
                onChange={(e) => setPuppyId(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2"
              >
                <option value="">Sélectionner un chiot...</option>

                {availablePuppies.map((puppy) => (
                  <option key={puppy.id} value={puppy.id}>
                    {puppy.identifier} ({puppy.sex})
                  </option>
                ))}
              </select>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleConvert}
              disabled={convertEntry.isPending || availablePuppies.length === 0}
            >
              {convertEntry.isPending ? "Enregistrement..." : "Confirmer la réservation"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
