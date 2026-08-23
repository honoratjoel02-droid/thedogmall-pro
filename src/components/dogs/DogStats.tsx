import { Mars, Venus, HeartPulse } from "lucide-react";

import StatTile from "../ui/stat-tile";
import LoadingState from "../ui/loading-state";
import { useDogs } from "../../hooks/useDogs";

type DogStatsProps = {
  sex: string;
  onSexChange: (sex: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
};

export default function DogStats({
  sex,
  onSexChange,
  status,
  onStatusChange,
}: DogStatsProps) {
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
      <StatTile
        label="Mâles"
        value={males}
        icon={Mars}
        tone="neutral"
        active={sex === "Mâle"}
        onClick={() => onSexChange(sex === "Mâle" ? "" : "Mâle")}
      />
      <StatTile
        label="Femelles"
        value={females}
        icon={Venus}
        tone="neutral"
        active={sex === "Femelle"}
        onClick={() => onSexChange(sex === "Femelle" ? "" : "Femelle")}
      />
      <StatTile
        label="Gestantes"
        value={pregnant}
        icon={HeartPulse}
        tone="danger"
        active={status === "Gestante"}
        onClick={() => onStatusChange(status === "Gestante" ? "" : "Gestante")}
      />
    </div>
  );
}
