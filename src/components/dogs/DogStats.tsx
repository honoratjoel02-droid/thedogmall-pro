import { Mars, Venus, HeartPulse } from "lucide-react";

import StatTile from "../ui/stat-tile";
import LoadingState from "../ui/loading-state";
import { useDogs } from "../../hooks/useDogs";

export default function DogStats() {
  const { data: dogs = [], isLoading } = useDogs();

  if (isLoading) {
    return (
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <LoadingState rows={1} rowClassName="h-24" className="col-span-full" />
      </div>
    );
  }

  const males = dogs.filter((dog) => dog.sex === "Mâle").length;

  const females = dogs.filter((dog) => dog.sex === "Femelle").length;

  const pregnant = dogs.filter((dog) => dog.status === "Gestante").length;

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
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
