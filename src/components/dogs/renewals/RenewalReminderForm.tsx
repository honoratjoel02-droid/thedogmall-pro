import { useState } from "react";

import type {
  RenewalReminder,
  RenewalReminderType,
} from "../../../types/models/renewalReminder";
import { RENEWAL_TYPES } from "../../../lib/renewals";
import {
  useCreateRenewalReminder,
  useUpdateRenewalReminder,
} from "../../../hooks/useRenewalReminders";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  dogId: string;
  reminder?: RenewalReminder;
  onSuccess?: () => void;
};

export default function RenewalReminderForm({
  dogId,
  reminder,
  onSuccess,
}: Props) {
  const createReminder = useCreateRenewalReminder();
  const updateReminder = useUpdateRenewalReminder();

  const [type, setType] = useState<RenewalReminderType>(
    reminder?.type ?? "Assurance",
  );
  const [label, setLabel] = useState(reminder?.label ?? "");
  const [dueDate, setDueDate] = useState(
    reminder
      ? reminder.dueDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [recurrenceMonths, setRecurrenceMonths] = useState(
    reminder?.recurrenceMonths ? String(reminder.recurrenceMonths) : "",
  );
  const [notes, setNotes] = useState(reminder?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createReminder.isPending || updateReminder.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!label.trim()) {
      setError("Le libellé est obligatoire.");
      return;
    }

    setError("");

    const data = {
      dogId,
      type,
      label: label.trim(),
      dueDate: new Date(dueDate).toISOString(),
      recurrenceMonths: recurrenceMonths ? Number(recurrenceMonths) : undefined,
      notes: notes || undefined,
    };

    if (reminder) {
      await updateReminder.mutateAsync({ id: reminder.id, data });
    } else {
      await createReminder.mutateAsync(data);

      setLabel("");
      setRecurrenceMonths("");
      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>

          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as RenewalReminderType)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {RENEWAL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Échéance</Label>

          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Libellé</Label>

        <Input
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ex : Assurance Fido - AXA, Puce électronique..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="recurrenceMonths">
          Récurrence en mois (optionnel)
        </Label>

        <Input
          id="recurrenceMonths"
          type="number"
          min="1"
          value={recurrenceMonths}
          onChange={(e) => setRecurrenceMonths(e.target.value)}
          placeholder="Ex : 12 pour un renouvellement annuel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>

        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : reminder
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
