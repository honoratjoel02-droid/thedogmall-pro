import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import SiteLayout from "../../components/site/SiteLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useCart } from "../../hooks/useCart";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
          <span className="text-5xl">🛒</span>

          <h1 className="text-2xl font-bold text-foreground">
            Votre panier est vide
          </h1>

          <p className="text-muted-foreground">
            Ajoutez des produits pour commencer votre commande.
          </p>

          <Button
            className="mt-2"
            render={<Link to="/produits">Voir les produits</Link>}
          />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Votre panier
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {items.map((item) => (
              <Card
                key={item.product.id}
                className="border-none shadow-sm ring-1 ring-border"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <Link
                    to={`/produits/${item.product.id}`}
                    className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-accent text-4xl"
                  >
                    {item.product.emoji}
                  </Link>

                  <div className="flex-1">
                    <Link
                      to={`/produits/${item.product.id}`}
                      className="font-semibold text-foreground hover:text-primary"
                    >
                      {item.product.name}
                    </Link>

                    <p className="text-sm text-muted-foreground">
                      {item.product.price.toFixed(2)} € / unité
                    </p>
                  </div>

                  <div className="flex items-center rounded-xl border border-input">
                    <button
                      type="button"
                      aria-label="Diminuer la quantité"
                      className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-6 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label="Augmenter la quantité"
                      className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="w-20 text-right font-semibold text-foreground">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </span>

                  <button
                    type="button"
                    aria-label="Retirer du panier"
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit border-none shadow-sm ring-1 ring-border">
            <CardContent className="flex flex-col gap-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Récapitulatif
              </h2>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Livraison</span>
                <span>Calculée à la commande</span>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 text-base font-bold text-foreground">
                <span>Total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

              <Button
                size="lg"
                className="mt-2 h-10 w-full"
                render={<Link to="/commande">Passer la commande</Link>}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
