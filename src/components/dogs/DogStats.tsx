import { Card, CardContent } from "../ui/card";
import { useDogs } from "../../hooks/useDogs";

export default function DogStats() {
  const { data: dogs = [], isLoading } = useDogs();

  if (isLoading) {
    return (
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">Chargement...</CardContent>
        </Card>
      </div>
    );
  }

  const total = dogs.length;

  const males = dogs.filter((dog) => dog.sex === "Mâle").length;

  const females = dogs.filter((dog) => dog.sex === "Femelle").length;

  const pregnant = dogs.filter((dog) => dog.status === "Gestante").length;

  const stats = [
    {
      title: "Total chiens",
      value: total,
      emoji: "🐶",
    },
    {
      title: "Mâles",
      value: males,
      emoji: "♂️",
    },
    {
      title: "Femelles",
      value: females,
      emoji: "♀️",
    },
    {
      title: "Gestantes",
      value: pregnant,
      emoji: "🤰",
    },
  ];

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>

              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>

            <div className="text-4xl">{stat.emoji}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
