import { useState, type FormEvent } from "react";
import { PawPrint, Lock, ShieldCheck } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const MIN_LENGTH = 4;

export default function Login() {
  const { status, createPassword, login } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSetup = status === "setup";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (isSetup) {
      if (password.length < MIN_LENGTH) {
        setError(`Le mot de passe doit contenir au moins ${MIN_LENGTH} caractères.`);
        return;
      }

      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }

      setIsSubmitting(true);
      await createPassword(password);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    const valid = await login(password);
    setIsSubmitting(false);

    if (!valid) {
      setError("Mot de passe incorrect.");
      setPassword("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <PawPrint className="size-6" />
          </span>

          <div className="text-center">
            <p className="text-xl font-bold text-primary">TheDogMall</p>
            <p className="text-sm text-muted-foreground">Gestion d'élevage</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isSetup ? (
                <ShieldCheck className="size-5" />
              ) : (
                <Lock className="size-5" />
              )}
              {isSetup ? "Créer un mot de passe" : "Accès protégé"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {isSetup && (
              <p className="mb-4 text-sm text-muted-foreground">
                Ce mot de passe protège l'accès à l'application sur cet
                appareil. Notez-le bien : il n'existe pas de récupération
                automatique.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isSetup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Veuillez patienter..."
                  : isSetup
                    ? "Créer le mot de passe"
                    : "Déverrouiller"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
