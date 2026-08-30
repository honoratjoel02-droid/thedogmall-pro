import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
            🐾
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              TheDogMall
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Connectez-vous pour gérer votre élevage
            </p>
          </div>
        </div>

        <Card className="border-none shadow-sm ring-1 ring-border">
          <CardContent className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                className="h-10 bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-10 bg-background"
              />
            </div>

            <Button className="h-10 w-full">
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
