import {
  Home,
  Dog,
  Heart,
  Baby,
  Users,
  CalendarDays,
  Settings,
  ArrowLeft,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

import { cn } from "../../lib/utils";

const menu = [
  { icon: Home, label: "Dashboard", path: "/admin", end: true },
  { icon: Dog, label: "Chiens", path: "/admin/dogs" },
  { icon: Heart, label: "Gestations", path: "/admin/breeding" },
  { icon: Baby, label: "Portées", path: "/admin/litters" },
  { icon: Users, label: "Clients", path: "/admin/clients" },
  { icon: CalendarDays, label: "Calendrier", path: "/admin/calendar" },
  { icon: Settings, label: "Paramètres", path: "/admin/settings" },
];

export default function AppSidebar() {
  return (
    <aside className="flex w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-6">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sidebar-primary text-2xl shadow-sm">
          🐾
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight">
            TheDogMall
          </h1>

          <p className="text-xs text-sidebar-foreground/60">
            Gestion d'élevage
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <ArrowLeft size={14} />
          Retour au site
        </Link>

        <p className="mt-2 px-2 text-xs text-sidebar-foreground/40">
          © {new Date().getFullYear()} TheDogMall
        </p>
      </div>
    </aside>
  );
}
