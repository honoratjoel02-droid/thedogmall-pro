import type { Dog } from "../../../types/dog";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface BreedingPairProps {
  female?: Dog;
  male?: Dog;
}

function getInitial(name?: string) {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
}

export default function BreedingPair({ female, male }: BreedingPairProps) {
  return (
    <div className="flex items-center justify-center gap-8 rounded-xl border bg-muted/20 p-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          {female?.photo && (
            <AvatarImage src={female.photo} alt={female.name} />
          )}

          <AvatarFallback>{getInitial(female?.name)}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <p className="font-semibold">{female?.name ?? "Femelle"}</p>

          <p className="text-xs text-muted-foreground">{female?.breed ?? ""}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">❤️</span>

        <span className="text-xs text-muted-foreground">Saillie</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          {male?.photo && <AvatarImage src={male.photo} alt={male.name} />}

          <AvatarFallback>{getInitial(male?.name)}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <p className="font-semibold">{male?.name ?? "Mâle"}</p>

          <p className="text-xs text-muted-foreground">{male?.breed ?? ""}</p>
        </div>
      </div>
    </div>
  );
}
