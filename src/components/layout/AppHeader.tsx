import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const pageInfo: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Tableau de bord",
    subtitle: "Vue d'ensemble de votre élevage",
  },
  "/dogs": {
    title: "Chiens",
    subtitle: "Gérez tous les chiens de votre élevage",
  },
  "/breeding": {
    title: "Gestations",
    subtitle: "Suivi des gestations en cours",
  },
  "/litters": {
    title: "Portées",
    subtitle: "Suivi des portées et des chiots",
  },
  "/clients": {
    title: "Clients",
    subtitle: "Votre carnet de contacts",
  },
  "/calendar": {
    title: "Calendrier",
    subtitle: "Rendez-vous et évènements à venir",
  },
  "/settings": {
    title: "Paramètres",
    subtitle: "Configuration de l'application",
  },
};

export default function AppHeader() {
  const { pathname } = useLocation();
  const info = pageInfo[pathname] ?? pageInfo["/"];

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-6">
      <div className="min-w-0">
        <h2 className="truncate text-lg font-semibold text-foreground">
          {info.title}
        </h2>
        <p className="truncate text-sm text-muted-foreground">
          {info.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="h-9 w-56 pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              />
            }
          >
            <Bell className="size-4.5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-card" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-0.5 py-2">
              <span className="font-medium">Maya est en gestation</span>
              <span className="text-xs text-muted-foreground">
                Mise bas prévue dans 3 semaines
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5 py-2">
              <span className="font-medium">Rendez-vous vétérinaire</span>
              <span className="text-xs text-muted-foreground">
                Demain à 10h00
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5 py-2">
              <span className="font-medium">Nouveau message client</span>
              <span className="text-xs text-muted-foreground">
                Il y a 2 heures
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                JO
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">Joel</span>
              <span className="text-xs font-normal text-muted-foreground">
                joel@thedogmall.fr
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mon profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
