import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { useSalesByClient } from "../../hooks/useSales";
import { usePuppies } from "../../hooks/usePuppies";
import { getBalanceDue, isFullyPaid } from "../../lib/payments";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";

type Props = {
  clientId: string;
};

export default function ClientPurchases({ clientId }: Props) {
  const { data: sales = [], isLoading } = useSalesByClient(clientId);
  const { data: puppies = [] } = usePuppies();

  if (isLoading) {
    return <LoadingState rows={2} />;
  }

  if (sales.length === 0) {
    return <EmptyState icon={ShoppingBag} label="Aucun achat pour l'instant." />;
  }

  const sorted = [...sales].sort((a, b) => b.saleDate.localeCompare(a.saleDate));

  return (
    <div className="space-y-3">
      {sorted.map((sale) => {
        const puppy = puppies.find((p) => p.id === sale.puppyId);

        return (
          <Card key={sale.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-2 p-4">
              <div>
                <p className="font-medium">
                  {puppy?.identifier ?? "Chiot"}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(sale.saleDate).toLocaleDateString("fr-FR")} ·{" "}
                  {sale.price.toLocaleString("fr-FR")} FCFA
                </p>
              </div>

              <div className="flex items-center gap-2">
                {sale.contractSigned && (
                  <Badge variant="secondary">Contrat signé</Badge>
                )}

                {!isFullyPaid(sale) && (
                  <Badge variant="outline" className="border-amber-500 text-amber-600">
                    Solde dû : {getBalanceDue(sale).toLocaleString("fr-FR")} FCFA
                  </Badge>
                )}

                <Link
                  to={`/contracts/${sale.id}`}
                  target="_blank"
                  className="text-sm text-primary underline-offset-2 hover:underline"
                >
                  Aperçu du contrat
                </Link>

                {puppy && (
                  <Link
                    to={`/litters/${puppy.litterId}`}
                    className="text-sm text-primary underline-offset-2 hover:underline"
                  >
                    Voir la portée
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
