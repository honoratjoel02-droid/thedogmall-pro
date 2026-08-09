import { useLitters } from "../../hooks/useLitters";

import LitterCard from "./LitterCard";

export default function LitterList() {
  const { data: litters = [], isLoading } = useLitters();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (litters.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucune portée enregistrée.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {litters.map((litter) => (
        <LitterCard key={litter.id} litter={litter} />
      ))}
    </div>
  );
}
