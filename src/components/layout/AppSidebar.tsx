import {
  Home,
  Dog,
  Heart,
  Baby,
  Users,
  CalendarDays,
  Wallet,
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
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Dog, label: "Chiens", path: "/dogs" },
  { icon: Heart, label: "Gestations", path: "/breeding" },
  { icon: Baby, label: "Portées", path: "/litters" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: CalendarDays, label: "Calendrier", path: "/calendar" },
  { icon: Wallet, label: "Finances", path: "/finances" },
  { icon: Settings, label: "Paramètres", path: "/settings" },
];

export default function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <PawPrint className="size-5" />
          </span>

          <span className="flex flex-col">
            <span className="text-lg font-bold text-primary">TheDogMall</span>

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
                      className="data-active:bg-primary data-active:text-primary-foreground data-active:shadow-sm data-active:hover:bg-primary data-active:hover:text-primary-foreground hover:bg-primary/10 hover:text-primary"
                      render={(props) => (
                        <Link {...props} to={item.path}>
                          <item.icon size={20} />
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
