import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PawPrint className="size-10" />
        </div>

        <h1 className="text-3xl font-bold">Page introuvable</h1>

        <p className="max-w-md text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>

        <Button render={(props) => <Link {...props} to="/">Retour au dashboard</Link>} />
      </div>
    </MainLayout>
  );
}
