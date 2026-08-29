import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <PawPrint className="size-8" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          404 — Page introuvable
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Cette page a filé comme un chiot. Retournez au tableau de bord pour
          reprendre votre chemin.
        </p>
      </div>

      <Button render={<Link to="/" />}>Retour au tableau de bord</Button>
    </div>
  );
}
