import {
  Home,
  Dog,
  Heart,
  Baby,
  Users,
  CalendarDays,
  Wallet,
  BarChart3,
  Settings,
  PawPrint,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const menu = [
  { icon: Home, label: "Tableau de bord", path: "/" },
  { icon: Dog, label: "Chiens", path: "/dogs" },
  { icon: Heart, label: "Gestations", path: "/breeding" },
  { icon: Baby, label: "Portées", path: "/litters" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: CalendarDays, label: "Calendrier", path: "/calendar" },
  { icon: Wallet, label: "Finances", path: "/finances" },
  { icon: BarChart3, label: "Statistiques", path: "/statistics" },
  { icon: Settings, label: "Paramètres", path: "/settings" },
];

export default function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PawPrint className="size-4.5" />
          </span>

          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground">TheDogMall</span>

            <span className="text-xs text-muted-foreground">
              Gestion d'élevage
            </span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-1">
              {menu.map((item) => {
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      size="lg"
                      className="border-l-2 border-transparent data-active:border-primary data-active:bg-primary/10 data-active:font-medium data-active:text-primary data-active:hover:bg-primary/10 data-active:hover:text-primary hover:bg-muted hover:text-foreground"
                      render={(props) => (
                        <Link {...props} to={item.path}>
                          <item.icon size={18} />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
