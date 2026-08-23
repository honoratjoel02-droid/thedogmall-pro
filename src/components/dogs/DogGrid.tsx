import { Dog as DogIcon } from "lucide-react";

import DogCard from "./DogCard";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";
import type { Dog } from "../../types/dog";

type DogGridProps = {
  dogs: Dog[];
  isLoading?: boolean;
};

const STATUS_ORDER = ["Gestante", "Disponible", "Réservé", "Retraité"];

export default function DogGrid({ dogs, isLoading = false }: DogGridProps) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (dogs.length === 0) {
    return <EmptyState icon={DogIcon} label="Aucun chien enregistré." />;
  }

  const otherStatuses = [...new Set(dogs.map((dog) => dog.status))].filter(
    (status) => !STATUS_ORDER.includes(status),
  );

  const groups = [...STATUS_ORDER, ...otherStatuses]
    .map((status) => ({
      status,
      dogs: dogs.filter((dog) => dog.status === status),
    }))
    .filter((group) => group.dogs.length > 0);

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.status}>
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
            {group.status} ({group.dogs.length})
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {group.dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
