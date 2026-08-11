import { Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeToggle from "../theme/ThemeToggle";

import { useTasks } from "../../hooks/useTasks";
import { usePregnancies } from "../../hooks/usePregnancies";
import { usePuppies } from "../../hooks/usePuppies";
import { useDogs } from "../../hooks/useDogs";
import { useHealthRecords } from "../../hooks/useHealthRecords";
import { useAuth } from "../../hooks/useAuth";

import { computeAlerts } from "../../lib/alerts";

const PAGE_TITLES: { match: (path: string) => boolean; title: string; subtitle: string }[] = [
  { match: (p) => p === "/", title: "Dashboard", subtitle: "Bienvenue sur TheDogMall" },
  { match: (p) => p.startsWith("/dogs"), title: "Chiens", subtitle: "Gestion de l'élevage" },
  { match: (p) => p.startsWith("/breeding"), title: "Gestations", subtitle: "Suivi de la reproduction" },
  { match: (p) => p.startsWith("/litters"), title: "Portées", subtitle: "Chiots et réservations" },
  { match: (p) => p.startsWith("/clients"), title: "Clients", subtitle: "Suivi de la clientèle" },
  { match: (p) => p.startsWith("/calendar"), title: "Calendrier", subtitle: "Tâches et rappels" },
  { match: (p) => p.startsWith("/finances"), title: "Finances", subtitle: "Dépenses, recettes et rentabilité" },
  { match: (p) => p.startsWith("/settings"), title: "Paramètres", subtitle: "Configuration de l'application" },
];

export default function AppHeader() {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const { data: tasks = [] } = useTasks();
  const { data: pregnancies = [] } = usePregnancies();
  const { data: puppies = [] } = usePuppies();
  const { data: dogs = [] } = useDogs();
  const { data: healthRecords = [] } = useHealthRecords();

  const alertCount = computeAlerts({
    tasks,
    pregnancies,
    puppies,
    dogs,
    healthRecords,
  }).length;

  const page =
    PAGE_TITLES.find((entry) => entry.match(pathname)) ?? PAGE_TITLES[0];

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:h-20 sm:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger />

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold sm:text-2xl">
            {page.title}
          </h2>

          <p className="hidden text-sm text-muted-foreground sm:block">
            {page.subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <Link to="/calendar" className="relative">
          <Bell className="text-muted-foreground transition-colors hover:text-primary" size={20} />

          {alertCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {alertCount > 9 ? "9+" : alertCount}
            </span>
          )}
        </Link>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <button {...props} className="rounded-full outline-none">
                <Avatar>
                  <AvatarFallback>JO</AvatarFallback>
                </Avatar>
              </button>
            )}
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout}>
              <LogOut className="size-4" />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
