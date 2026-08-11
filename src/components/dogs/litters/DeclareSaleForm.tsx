import { useState } from "react";

import type { Puppy } from "../../../types/models/puppy";
import { useDeclareSale } from "../../../hooks/useSales";
import { useClients } from "../../../hooks/useClients";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  puppy: Puppy;
  onSuccess?: () => void;
};

export default function DeclareSaleForm({ puppy, onSuccess }: Props) {
  const declareSale = useDeclareSale();
  const { data: clients = [] } = useClients();

  const [clientId, setClientId] = useState(puppy.reservedForClientId ?? "");
  const [price, setPrice] = useState("");
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [contractSigned, setContractSigned] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!clientId) {
      setError("Sélectionnez le client acheteur.");
      return;
    }

    if (!price) {
      setError("Indiquez le prix de vente.");
      return;
    }

    setError("");

    await declareSale.mutateAsync({
      puppy,
      clientId,
      price: Number(price),
      saleDate: new Date(saleDate).toISOString(),
      contractSigned,
      notes: notes || undefined,
    });

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="clientId">Client acheteur</Label>

        <select
          id="clientId"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="">Sélectionner un client...</option>

          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstName} {client.lastName}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Prix de vente (FCFA)</Label>

          <Input
            id="price"
            type="number"
            min={0}
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="saleDate">Date de vente</Label>

          <Input
            id="saleDate"
            type="date"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={contractSigned}
          onChange={(e) => setContractSigned(e.target.checked)}
          className="size-4 accent-primary"
        />
        Contrat de cession signé
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

      <p className="text-sm text-muted-foreground">
        Cette action marque le chiot comme vendu et enregistre
        automatiquement une recette dans le module Finances.
      </p>

      <div className="flex justify-end">
        <Button type="submit" disabled={declareSale.isPending}>
          {declareSale.isPending ? "Enregistrement..." : "Déclarer la vente"}
        </Button>
      </div>
    </form>
  );
}
