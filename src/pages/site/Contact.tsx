import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import SiteLayout from "../../components/site/SiteLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Contactez-nous
        </h1>

        <p className="mt-1 max-w-xl text-muted-foreground">
          Une question sur un produit ou une commande ? Écrivez-nous,
          nous vous répondons rapidement.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <Card className="border-none shadow-sm ring-1 ring-border md:col-span-2">
            <CardContent className="p-6">
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <span className="text-4xl">✅</span>
                  <h2 className="text-lg font-semibold text-foreground">
                    Message envoyé
                  </h2>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Merci, nous revenons vers vous très vite.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Votre nom"
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
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      required
                      placeholder="Sujet de votre message"
                      className="h-10 bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Votre message..."
                      className="rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </div>

                  <Button type="submit" size="lg" className="h-10">
                    Envoyer le message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit border-none shadow-sm ring-1 ring-border">
            <CardContent className="flex flex-col gap-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Nos coordonnées
              </h2>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                contact@thedogmall.fr
              </div>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                01 23 45 67 89
              </div>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                12 rue des Chiots, 75000 Paris
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
