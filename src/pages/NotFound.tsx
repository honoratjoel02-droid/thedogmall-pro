import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
        🐾
      </div>

      <h1 className="text-4xl font-bold text-foreground">
        404
      </h1>

      <p className="max-w-sm text-muted-foreground">
        Oups, cette page a filé comme un chiot un jour de balade.
        Page introuvable.
      </p>

      <Button
        render={
          <Link to="/">Retour au tableau de bord</Link>
        }
      />
    </div>
  );
}
