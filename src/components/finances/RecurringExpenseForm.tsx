import { useState } from "react";

import type { ExpenseCategory } from "../../types/models/expense";
import type {
  RecurringExpense,
  RecurringExpenseFrequency,
} from "../../types/models/recurringExpense";
import { FREQUENCIES } from "../../lib/recurringExpenses";
import {
  useCreateRecurringExpense,
  useUpdateRecurringExpense,
} from "../../hooks/useRecurringExpenses";
import { useDogs } from "../../hooks/useDogs";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CATEGORIES: ExpenseCategory[] = [
  "Alimentation",
  "Vétérinaire",
  "Vaccination",
  "Vermifuge",
  "Toilettage",
  "Saillie",
  "Transport",
  "Matériel",
  "Exposition",
  "Administration",
  "Autre",
];

type Props = {
  item?: RecurringExpense;
  onSuccess?: () => void;
};

export default function RecurringExpenseForm({ item, onSuccess }: Props) {
  const createItem = useCreateRecurringExpense();
  const updateItem = useUpdateRecurringExpense();
  const { data: dogs = [] } = useDogs();

  const [title, setTitle] = useState(item?.title ?? "");
  const [amount, setAmount] = useState(item ? String(item.amount) : "");
  const [category, setCategory] = useState<ExpenseCategory>(
    item?.category ?? "Autre",
  );
  const [frequency, setFrequency] = useState<RecurringExpenseFrequency>(
    item?.frequency ?? "Mensuel",
  );
  const [nextDueDate, setNextDueDate] = useState(
    item
      ? item.nextDueDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [dogId, setDogId] = useState(item?.dogId ?? "");
  const [notes, setNotes] = useState(item?.notes ?? "");
  const [active, setActive] = useState(item?.active ?? true);
  const [error, setError] = useState("");

  const isPending = createItem.isPending || updateItem.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !amount) {
      setError("Le titre et le montant sont obligatoires.");
      return;
    }

    setError("");

    const data = {
      title: title.trim(),
      amount: Number(amount),
      category,
      frequency,
      nextDueDate: new Date(nextDueDate).toISOString(),
      dogId: dogId || undefined,
      notes: notes || undefined,
      active,
    };

    if (item) {
      await updateItem.mutateAsync({ id: item.id, data });
    } else {
      await createItem.mutateAsync(data);

      setTitle("");
      setAmount("");
      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>

        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex : Croquettes, Assurance, Abonnement..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="amount">Montant (FCFA)</Label>

          <Input
            id="amount"
            type="number"
            min={0}
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Fréquence</Label>

          <select
            id="frequency"
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value as RecurringExpenseFrequency)
            }
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nextDueDate">Prochaine échéance</Label>

          <Input
            id="nextDueDate"
            type="date"
            value={nextDueDate}
            onChange={(e) => setNextDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dogId">Chien lié (optionnel)</Label>

        <select
          id="dogId"
          value={dogId}
          onChange={(e) => setDogId(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="">Aucun</option>

          {dogs.map((dog) => (
            <option key={dog.id} value={dog.id}>
              {dog.name}
            </option>
          ))}
        </select>
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

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="size-4 accent-primary"
        />
        Active (génère des alertes et apparaît dans la liste)
      </label>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : item
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
