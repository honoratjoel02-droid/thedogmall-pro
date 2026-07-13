import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "../components/ui/card";
import {
  Dog,
  Users,
  Heart,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Chiens",
    value: "12",
    icon: Dog,
    color: "text-orange-500",
  },
  {
    title: "Clients",
    value: "8",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Gestations",
    value: "3",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "Évènements",
    value: "5",
    icon: CalendarDays,
    color: "text-green-500",
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="mb-8 text-4xl font-bold">
        🐶 Tableau de bord
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="transition hover:shadow-lg"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <Icon
                  className={`h-10 w-10 ${item.color}`}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}