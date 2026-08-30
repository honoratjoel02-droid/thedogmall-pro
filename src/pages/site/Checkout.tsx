import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";

import SiteLayout from "../../components/site/SiteLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useCart } from "../../hooks/useCart";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderTotal(subtotal);
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <SiteLayout>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
          <span className="text-5xl">🎉</span>

          <h1 className="text-2xl font-bold text-foreground">
            Merci pour votre commande !
          </h1>

          <p className="max-w-md text-muted-foreground">
            Votre commande de {orderTotal.toFixed(2)} € a bien été
            enregistrée. Nous vous contactons très vite pour
            confirmer les détails et le règlement.
          </p>

          <Button
            className="mt-2"
            render={<Link to="/produits">Continuer mes achats</Link>}
          />
        </div>
      </SiteLayout>
    );
  }

  if (items.length === 0) {
    return <Navigate to="/panier" replace />;
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Finaliser la commande
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <Card className="border-none shadow-sm ring-1 ring-border">
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Vos coordonnées
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      id="fullName"
                      required
                      placeholder="Jeanne Dupont"
                      className="h-10 bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                      className="h-10 bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="06 12 34 56 78"
                      className="h-10 bg-background"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm ring-1 ring-border">
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Adresse de livraison
                </h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-2 sm:col-span-3">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      required
                      placeholder="12 rue des Chiots"
                      className="h-10 bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      required
                      placeholder="75000"
                      className="h-10 bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      required
                      placeholder="Paris"
                      className="h-10 bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-3">
                    <Label htmlFor="notes">
                      Notes (facultatif)
                    </Label>
                    <Input
                      id="notes"
                      placeholder="Instructions de livraison..."
                      className="h-10 bg-background"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Aucun paiement en ligne pour le moment : nous vous
              contactons après votre commande pour organiser le
              règlement.
            </p>

            <Button type="submit" size="lg" className="h-11">
              Confirmer la commande
            </Button>
          </form>

          <Card className="h-fit border-none shadow-sm ring-1 ring-border">
            <CardContent className="flex flex-col gap-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Récapitulatif
              </h2>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>

                    <span className="font-medium text-foreground">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 text-base font-bold text-foreground">
                <span>Total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
