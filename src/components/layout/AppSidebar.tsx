import {
  LayoutDashboard,
  Dog,
  HeartPulse,
  Baby,
  Users,
  CalendarDays,
  Settings,
  PawPrint,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const menu = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/" },
  { icon: Dog, label: "Chiens", path: "/dogs" },
  { icon: HeartPulse, label: "Gestations", path: "/breeding" },
  { icon: Baby, label: "Portées", path: "/litters" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: CalendarDays, label: "Calendrier", path: "/calendar" },
];

export default function AppSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar-foreground ring-2 ring-sidebar-primary">
          <PawPrint className="size-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold tracking-tight text-sidebar-foreground">
            <span className="text-sidebar-primary">The</span>DogMall
          </p>
          <p className="truncate text-xs text-sidebar-foreground/60">
            Gestion d'élevage
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <p className="px-3 pt-2 pb-1 text-xs font-medium tracking-wide text-sidebar-foreground/45 uppercase">
          Navigation
        </p>

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <Icon className="size-4.5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-sidebar-border px-3 py-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )
          }
        >
          <Settings className="size-4.5 shrink-0" />
          <span>Paramètres</span>
        </NavLink>
      </div>
    </aside>
  );
}
