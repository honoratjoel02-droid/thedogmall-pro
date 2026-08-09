// src/components/dogs/litters/PregnancySelect.tsx

import { usePregnancies } from "../../../hooks/usePregnancies";
import { useBreedings } from "../../../hooks/useBreedings";
import { useLitters } from "../../../hooks/useLitters";
import { useDogs } from "../../../hooks/useDogs";

interface PregnancySelectProps {
  value: string;
  onChange: (pregnancyId: string) => void;
}

export default function PregnancySelect({
  value,
  onChange,
}: PregnancySelectProps) {
  const { data: pregnancies = [] } = usePregnancies();
  const { data: breedings = [] } = useBreedings();
  const { data: litters = [] } = useLitters();
  const { data: dogs = [] } = useDogs();

  const usedPregnancyIds = new Set(litters.map((litter) => litter.pregnancyId));

  const eligible = pregnancies.filter(
    (pregnancy) =>
      pregnancy.status === "Terminée" && !usedPregnancyIds.has(pregnancy.id),
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border bg-background px-3 py-2"
    >
      <option value="">Sélectionner une gestation terminée...</option>

      {eligible.map((pregnancy) => {
        const breeding = breedings.find((b) => b.id === pregnancy.breedingId);
        const female = dogs.find((dog) => dog.id === pregnancy.femaleId);
        const male = breeding
          ? dogs.find((dog) => dog.id === breeding.maleId)
          : undefined;

        return (
          <option key={pregnancy.id} value={pregnancy.id}>
            {female?.name ?? "Femelle"} ❤️ {male?.name ?? "Mâle"} —{" "}
            {new Date(pregnancy.expectedBirthDate).toLocaleDateString(
              "fr-FR",
            )}
          </option>
        );
      })}
    </select>
  );
}
