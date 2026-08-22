import { Home, Dog, Baby, Users, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "../../lib/utils";
import { useSidebar } from "../ui/sidebar";

const items = [
  { icon: Home, label: "Accueil", path: "/" },
  { icon: Dog, label: "Chiens", path: "/dogs" },
  { icon: Baby, label: "Portées", path: "/litters" },
  { icon: Users, label: "Clients", path: "/clients" },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex items-stretch border-t border-border bg-card md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {items.map((item) => {
        const isActive =
          item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="size-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={() => setOpenMobile(true)}
        className="flex flex-1 flex-col items-center gap-1 py-2.5 text-xs text-muted-foreground"
      >
        <Menu className="size-5" />
        <span className="font-medium">Plus</span>
      </button>
    </nav>
  );
}
