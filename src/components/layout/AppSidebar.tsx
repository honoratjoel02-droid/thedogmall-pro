import {
  Home,
  Dog,
  Heart,
  Baby,
  Users,
  CalendarDays,
  Wallet,
  Settings,
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
        <Link to="/" className="flex flex-col">
          <span className="flex items-center gap-2 text-xl font-bold text-orange-600">
            🐶 TheDogMall
          </span>

          <span className="text-sm text-muted-foreground">
            Gestion d'élevage
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
                      className="data-active:bg-orange-500 data-active:text-white data-active:hover:bg-orange-500 data-active:hover:text-white hover:bg-orange-100 hover:text-orange-600"
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
