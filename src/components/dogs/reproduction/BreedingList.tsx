import BreedingCard from "./BreedingCard";
import { useBreedings } from "../../../hooks/useBreedings";

export default function BreedingList() {
  const { data: breedings = [], isLoading } = useBreedings();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (breedings.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucune saillie enregistrée.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {breedings.map((breeding) => (
        <BreedingCard key={breeding.id} breeding={breeding} />
      ))}
    </div>
  );
}
