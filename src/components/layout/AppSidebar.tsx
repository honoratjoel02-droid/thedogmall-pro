import {
  Home,
  Dog,
  Heart,
  Baby,
  Users,
  CalendarDays,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Dog, label: "Chiens", path: "/dogs" },
  { icon: Heart, label: "Gestations", path: "/breeding" },
  { icon: Baby, label: "Portées", path: "/litters" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: CalendarDays, label: "Calendrier", path: "/calendar" },
  { icon: Settings, label: "Paramètres", path: "/settings" },
];

export default function AppSidebar() {
  return (
    <aside className="w-72 border-r bg-white shadow-sm">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-orange-600">
          🐶 TheDogMall
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Gestion d'élevage
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-100 hover:text-orange-600"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}