import { useState } from "react";

import type { Sale } from "../../../types/models/sale";
import { useAddPayment } from "../../../hooks/useSales";
import { getBalanceDue } from "../../../lib/payments";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  sale: Sale;
  puppyIdentifier: string;
  onSuccess?: () => void;
};

export default function PaymentForm({
  sale,
  puppyIdentifier,
  onSuccess,
}: Props) {
  const addPayment = useAddPayment();
  const balanceDue = getBalanceDue(sale);

  const [amount, setAmount] = useState(String(balanceDue));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(amount);

    if (!amount || value <= 0) {
      setError("Indiquez un montant supérieur à 0.");
      return;
    }

    if (value > balanceDue) {
      setError(
        `Le montant dépasse le solde restant dû (${balanceDue.toLocaleString("fr-FR")} FCFA).`,
      );
      return;
    }

    setError("");

    await addPayment.mutateAsync({
      sale,
      puppyIdentifier,
      amount: value,
      date: new Date(date).toISOString(),
      notes: notes || undefined,
    });

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="paymentAmount">Montant (FCFA)</Label>

          <Input
            id="paymentAmount"
            type="number"
            min={0}
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentDate">Date du paiement</Label>

          <Input
            id="paymentDate"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-2">
        <Label htmlFor="paymentNotes">Notes</Label>

        <textarea
          id="paymentNotes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={addPayment.isPending}>
          {addPayment.isPending ? "Enregistrement..." : "Enregistrer le paiement"}
        </Button>
      </div>
    </form>
  );
}
