import { useState } from "react";

import type {
  HealthRecord,
  HealthRecordType,
} from "../../../types/models/healthRecord";
import {
  useCreateHealthRecord,
  useUpdateHealthRecord,
} from "../../../hooks/useHealthRecords";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const TYPES: HealthRecordType[] = [
  "Vaccination",
  "Vermifuge",
  "Traitement",
  "Consultation vétérinaire",
  "Pesée",
  "Autre",
];

type Props = {
  dogId: string;
  record?: HealthRecord;
  onSuccess?: () => void;
};

export default function HealthRecordForm({ dogId, record, onSuccess }: Props) {
  const createRecord = useCreateHealthRecord();
  const updateRecord = useUpdateHealthRecord();

  const [type, setType] = useState<HealthRecordType>(
    record?.type ?? "Vaccination",
  );
  const [title, setTitle] = useState(record?.title ?? "");
  const [date, setDate] = useState(
    record ? record.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [weightKg, setWeightKg] = useState(
    record?.weightKg ? String(record.weightKg) : "",
  );
  const [done, setDone] = useState(record?.done ?? true);
  const [notes, setNotes] = useState(record?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createRecord.isPending || updateRecord.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    setError("");

    const data = {
      dogId,
      type,
      title: title.trim(),
      date: new Date(date).toISOString(),
      weightKg: type === "Pesée" && weightKg ? Number(weightKg) : undefined,
      done,
      notes: notes || undefined,
    };

    if (record) {
      await updateRecord.mutateAsync({ id: record.id, data });
    } else {
      await createRecord.mutateAsync(data);

      setTitle("");
      setNotes("");
      setWeightKg("");
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
            onChange={(e) => setType(e.target.value as HealthRecordType)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>

          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>

        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex : Rappel CHPPI, Vermifuge annuel..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {type === "Pesée" && (
        <div className="space-y-2">
          <Label htmlFor="weightKg">Poids (kg)</Label>

          <Input
            id="weightKg"
            type="number"
            min={0}
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />
        </div>
      )}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
          className="size-4 accent-primary"
        />
        Déjà effectué (décoché = à prévoir, apparaîtra dans les alertes)
      </label>

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
            : record
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
