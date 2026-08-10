import { useState } from "react";

import type { Expense, ExpenseCategory } from "../../types/models/expense";
import { useCreateExpense, useUpdateExpense } from "../../hooks/useExpenses";
import { useDogs } from "../../hooks/useDogs";
import { useLitters } from "../../hooks/useLitters";

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
  expense?: Expense;
  defaultDogId?: string;
  defaultLitterId?: string;
  onSuccess?: () => void;
};

export default function ExpenseForm({
  expense,
  defaultDogId,
  defaultLitterId,
  onSuccess,
}: Props) {
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const { data: dogs = [] } = useDogs();
  const { data: litters = [] } = useLitters();

  const [title, setTitle] = useState(expense?.title ?? "");
  const [amount, setAmount] = useState(
    expense ? String(expense.amount) : "",
  );
  const [category, setCategory] = useState<ExpenseCategory>(
    expense?.category ?? "Autre",
  );
  const [expenseDate, setExpenseDate] = useState(
    expense
      ? expense.expenseDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [dogId, setDogId] = useState(expense?.dogId ?? defaultDogId ?? "");
  const [litterId, setLitterId] = useState(
    expense?.litterId ?? defaultLitterId ?? "",
  );
  const [description, setDescription] = useState(expense?.description ?? "");
  const [error, setError] = useState("");

  const isPending = createExpense.isPending || updateExpense.isPending;

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
      expenseDate: new Date(expenseDate).toISOString(),
      dogId: dogId || undefined,
      litterId: litterId || undefined,
      description: description || undefined,
    };

    if (expense) {
      await updateExpense.mutateAsync({ id: expense.id, data });
    } else {
      await createExpense.mutateAsync(data);

      setTitle("");
      setAmount("");
      setDescription("");
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
          placeholder="Ex : Croquettes, Vaccin..."
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
          <Label htmlFor="expenseDate">Date</Label>

          <Input
            id="expenseDate"
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2">
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
          <Label htmlFor="litterId">Portée liée (optionnel)</Label>

          <select
            id="litterId"
            value={litterId}
            onChange={(e) => setLitterId(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            <option value="">Aucune</option>

            {litters.map((litter) => (
              <option key={litter.id} value={litter.id}>
                Portée du{" "}
                {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : expense
              ? "Enregistrer les modifications"
              : "Ajouter la dépense"}
        </Button>
      </div>
    </form>
  );
}
