import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { mockDogs } from "../data/mockDogs";
import { getAgeLabel, getInitials } from "../lib/utils";
import {
  Dog,
  Users,
  HeartPulse,
  CalendarDays,
  ArrowUpRight,
  ChevronRight,
  Stethoscope,
  Baby,
} from "lucide-react";

const stats = [
  {
    title: "Chiens",
    value: "12",
    trend: "+2 ce mois",
    icon: Dog,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    title: "Clients",
    value: "8",
    trend: "+1 ce mois",
    icon: Users,
    iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    title: "Gestations",
    value: "3",
    trend: "en cours",
    icon: HeartPulse,
    iconClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    title: "Évènements",
    value: "5",
    trend: "cette semaine",
    icon: CalendarDays,
    iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

const upcomingEvents = [
  {
    title: "Consultation vétérinaire — Maya",
    when: "Demain, 10h00",
    icon: Stethoscope,
  },
  {
    title: "Mise bas prévue — Maya",
    when: "Dans 3 semaines",
    icon: Baby,
  },
  {
    title: "Visite d'un client — Bella",
    when: "Vendredi, 15h30",
    icon: Users,
  },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Disponible: "secondary",
  Réservé: "outline",
  Gestante: "default",
  Retraité: "outline",
};

export default function Dashboard() {
  const recentDogs = mockDogs.slice(0, 4);

  return (
    <MainLayout>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <ArrowUpRight className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    {item.trend}
                  </p>
                </div>

                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
                >
                  <Icon className="size-5.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Chiens récents</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              render={<Link to="/dogs" />}
            >
              Voir tout
              <ChevronRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentDogs.map((dog) => (
              <div
                key={dog.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
              >
                <Avatar size="lg">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(dog.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {dog.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {dog.breed} · {getAgeLabel(dog.birthDate)}
                  </p>
                </div>

                <Badge variant={statusVariant[dog.status]}>
                  {dog.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>À venir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {upcomingEvents.map((event) => {
              const Icon = event.icon;

              return (
                <div
                  key={event.title}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.when}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
