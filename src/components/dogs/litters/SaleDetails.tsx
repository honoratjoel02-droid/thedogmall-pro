import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, X } from "lucide-react";

import {
  useSaleByPuppy,
  useRevertSale,
  useDeletePayment,
} from "../../../hooks/useSales";
import { useClients } from "../../../hooks/useClients";
import { usePuppies } from "../../../hooks/usePuppies";
import { getBalanceDue, getTotalPaid, isFullyPaid } from "../../../lib/payments";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

import AddPaymentDialog from "./AddPaymentDialog";

type Props = {
  puppyId: string;
};

export default function SaleDetails({ puppyId }: Props) {
  const { data: sale } = useSaleByPuppy(puppyId);
  const { data: clients = [] } = useClients();
  const { data: puppies = [] } = usePuppies();
  const revertSale = useRevertSale();
  const deletePayment = useDeletePayment();

  const [open, setOpen] = useState(false);

  if (!sale) return null;

  const client = clients.find((c) => c.id === sale.clientId);
  const puppy = puppies.find((p) => p.id === puppyId);
  const totalPaid = getTotalPaid(sale);
  const balanceDue = getBalanceDue(sale);
  const fullyPaid = isFullyPaid(sale);

  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
        <span>
          Vendu à{" "}
          {client ? (
            <Link
              to={`/clients/${client.id}`}
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              {client.firstName} {client.lastName}
            </Link>
          ) : (
            "un client"
          )}{" "}
          le {new Date(sale.saleDate).toLocaleDateString("fr-FR")} pour{" "}
          <span className="font-medium text-foreground">
            {sale.price.toLocaleString("fr-FR")} FCFA
          </span>
        </span>

        {sale.contractSigned && (
          <Badge variant="secondary" className="gap-1">
            <BadgeCheck className="size-3" />
            Contrat signé
          </Badge>
        )}

        <Badge
          variant={fullyPaid ? "secondary" : "outline"}
          className={fullyPaid ? "" : "border-amber-500 text-amber-600"}
        >
          {fullyPaid
            ? "Payé intégralement"
            : `Solde dû : ${balanceDue.toLocaleString("fr-FR")} FCFA`}
        </Badge>
      </div>

      {sale.payments.length > 0 && (
        <div className="space-y-1 rounded-md border px-3 py-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            Paiements reçus ({totalPaid.toLocaleString("fr-FR")} FCFA)
          </p>

          {[...sale.payments]
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-2"
              >
                <span>
                  {new Date(payment.date).toLocaleDateString("fr-FR")} —{" "}
                  <span className="font-medium text-foreground">
                    {payment.amount.toLocaleString("fr-FR")} FCFA
                  </span>
                  {payment.notes ? ` (${payment.notes})` : ""}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => deletePayment.mutate({ sale, paymentId: payment.id })}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {!fullyPaid && (
          <AddPaymentDialog
            sale={sale}
            puppyIdentifier={puppy?.identifier ?? "chiot"}
          />
        )}

        <Button
          variant="outline"
          size="sm"
          render={(props) => (
            <Link {...props} to={`/contracts/${sale.id}`} target="_blank">
              Aperçu du contrat
            </Link>
          )}
        />

        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          Annuler la vente
        </Button>
      </div>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Annuler cette vente ?"
        description="Le chiot repassera au statut Disponible et les recettes associées à cette vente seront supprimées."
        confirmLabel="Annuler la vente"
        onConfirm={() => revertSale.mutate(sale)}
      />
    </div>
  );
}
