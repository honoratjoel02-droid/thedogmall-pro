import { breedingService } from "../../../services/breedings";
import BreedingCard from "./BreedingCard";

export default function BreedingList() {
  const breedings = breedingService.getAll();

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
