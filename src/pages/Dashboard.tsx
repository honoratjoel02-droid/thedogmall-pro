import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
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
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
  {
    title: "Clients",
    value: "8",
    icon: Users,
    color: "text-sky-600",
    bg: "bg-sky-500/10",
  },
  {
    title: "Gestations",
    value: "3",
    icon: Heart,
    color: "text-rose-600",
    bg: "bg-rose-500/10",
  },
  {
    title: "Évènements",
    value: "5",
    icon: CalendarDays,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        icon="🐶"
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre élevage"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="border-none shadow-sm ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon className={`size-7 ${item.color}`} />
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-foreground">
                    {item.value}
                  </h2>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
