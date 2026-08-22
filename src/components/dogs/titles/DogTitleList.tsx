import { Award } from "lucide-react";

import type { DogTitle, DogTitleCategory } from "../../../types/models/dogTitle";

import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

import EditDogTitleDialog from "./EditDogTitleDialog";
import DeleteDogTitleDialog from "./DeleteDogTitleDialog";

type Props = {
  titles: DogTitle[];
  isLoading?: boolean;
};

const CATEGORY_VARIANT: Record<
  DogTitleCategory,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Titre: "default",
  "Résultat d'exposition": "secondary",
  "Autre récompense": "outline",
};

export default function DogTitleList({ titles, isLoading = false }: Props) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (titles.length === 0) {
    return <EmptyState icon={Award} label="Aucun titre ou récompense enregistré." />;
  }

  const sorted = [...titles].sort((a, b) => b.eventDate.localeCompare(a.eventDate));

  return (
    <div className="space-y-3">
      {sorted.map((title) => (
        <Card key={title.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">{title.name}</p>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant={CATEGORY_VARIANT[title.category]}>
                  {title.category}
                </Badge>

                <span>{new Date(title.eventDate).toLocaleDateString("fr-FR")}</span>

                {title.organization && <span>· {title.organization}</span>}
              </div>

              {title.notes && (
                <p className="text-sm text-muted-foreground">{title.notes}</p>
              )}
            </div>

            <div className="flex gap-2">
              <EditDogTitleDialog title={title} />
              <DeleteDogTitleDialog title={title} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
