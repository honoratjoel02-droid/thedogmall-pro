import { PawPrint, Mail, Lock } from "lucide-react";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-sidebar ring-2 ring-primary">
            <PawPrint className="size-6 text-primary" />
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
            <span className="text-primary">The</span>DogMall
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connectez-vous à votre espace de gestion d'élevage
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <form
            className="space-y-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-1.5">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@elevage.fr"
                  className="pl-8"
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Mot de passe</Label>
                <a
                  href="#"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-8"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Contactez votre administrateur
          </a>
        </p>
      </div>
    </div>
  );
}
