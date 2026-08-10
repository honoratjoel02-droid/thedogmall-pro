import { useState } from "react";

import type { Income, IncomeCategory } from "../../types/models/income";
import { useCreateIncome, useUpdateIncome } from "../../hooks/useIncomes";
import { useDogs } from "../../hooks/useDogs";
import { useLitters } from "../../hooks/useLitters";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CATEGORIES: IncomeCategory[] = ["Vente de chiot", "Saillie", "Autre"];

type Props = {
  income?: Income;
  defaultDogId?: string;
  defaultLitterId?: string;
  onSuccess?: () => void;
};

export default function IncomeForm({
  income,
  defaultDogId,
  defaultLitterId,
  onSuccess,
}: Props) {
  const createIncome = useCreateIncome();
  const updateIncome = useUpdateIncome();
  const { data: dogs = [] } = useDogs();
  const { data: litters = [] } = useLitters();

  const [title, setTitle] = useState(income?.title ?? "");
  const [amount, setAmount] = useState(income ? String(income.amount) : "");
  const [category, setCategory] = useState<IncomeCategory>(
    income?.category ?? "Vente de chiot",
  );
  const [incomeDate, setIncomeDate] = useState(
    income
      ? income.incomeDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [dogId, setDogId] = useState(income?.dogId ?? defaultDogId ?? "");
  const [litterId, setLitterId] = useState(
    income?.litterId ?? defaultLitterId ?? "",
  );
  const [description, setDescription] = useState(income?.description ?? "");
  const [error, setError] = useState("");

  const isPending = createIncome.isPending || updateIncome.isPending;

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
      incomeDate: new Date(incomeDate).toISOString(),
      dogId: dogId || undefined,
      litterId: litterId || undefined,
      description: description || undefined,
    };

    if (income) {
      await updateIncome.mutateAsync({ id: income.id, data });
    } else {
      await createIncome.mutateAsync(data);

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
          placeholder="Ex : Vente chiot n°1..."
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
          <Label htmlFor="incomeDate">Date</Label>

          <Input
            id="incomeDate"
            type="date"
            value={incomeDate}
            onChange={(e) => setIncomeDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as IncomeCategory)}
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
            : income
              ? "Enregistrer les modifications"
              : "Ajouter la recette"}
        </Button>
      </div>
    </form>
  );
}
