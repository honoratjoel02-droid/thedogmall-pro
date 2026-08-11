import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";

import { useSaleByPuppy, useRevertSale } from "../../../hooks/useSales";
import { useClients } from "../../../hooks/useClients";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  puppyId: string;
};

export default function SaleDetails({ puppyId }: Props) {
  const { data: sale } = useSaleByPuppy(puppyId);
  const { data: clients = [] } = useClients();
  const revertSale = useRevertSale();

  const [open, setOpen] = useState(false);

  if (!sale) return null;

  const client = clients.find((c) => c.id === sale.clientId);

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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

      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Annuler la vente
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Annuler cette vente ?"
        description="Le chiot repassera au statut Disponible et la recette associée sera supprimée."
        confirmLabel="Annuler la vente"
        onConfirm={() => revertSale.mutate(sale)}
      />
    </div>
  );
}
