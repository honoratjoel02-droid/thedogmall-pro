import { Dog, Mars, Venus, HeartPulse } from "lucide-react";

import StatTile from "../ui/stat-tile";
import { useDogs } from "../../hooks/useDogs";

export default function DogStats() {
  const { data: dogs = [], isLoading } = useDogs();

  if (isLoading) {
    return (
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="col-span-full flex h-24 items-center justify-center text-muted-foreground">
          Chargement...
        </div>
      </div>
    );
  }

  const total = dogs.length;

  const males = dogs.filter((dog) => dog.sex === "Mâle").length;

  const females = dogs.filter((dog) => dog.sex === "Femelle").length;

  const pregnant = dogs.filter((dog) => dog.status === "Gestante").length;

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile label="Total chiens" value={total} icon={Dog} />
      <StatTile label="Mâles" value={males} icon={Mars} tone="neutral" />
      <StatTile label="Femelles" value={females} icon={Venus} tone="neutral" />
      <StatTile
        label="Gestantes"
        value={pregnant}
        icon={HeartPulse}
        tone="danger"
      />
    </div>
  );
}
