import { Heart } from "lucide-react";

import BreedingCard from "./BreedingCard";
import { useBreedings } from "../../../hooks/useBreedings";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

export default function BreedingList() {
  const { data: breedings = [], isLoading } = useBreedings();

  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (breedings.length === 0) {
    return <EmptyState icon={Heart} label="Aucune saillie enregistrée." />;
  }

  return (
    <div className="space-y-4">
      {breedings.map((breeding) => (
        <BreedingCard key={breeding.id} breeding={breeding} />
      ))}
    </div>
  );
}
