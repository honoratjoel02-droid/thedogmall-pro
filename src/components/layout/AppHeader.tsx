import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeToggle from "../theme/ThemeToggle";
import GlobalSearchDialog from "../search/GlobalSearchDialog";
import AlertsDropdown from "./AlertsDropdown";

import { useAuth } from "../../hooks/useAuth";

export default function AppHeader() {
  const { logout } = useAuth();

  return (
    <header className="relative z-10 flex min-h-16 items-center justify-between gap-4 border-b border-primary-foreground/15 bg-primary px-4 text-primary-foreground sm:min-h-20 sm:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="hidden md:inline-flex" />
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <GlobalSearchDialog />

        <AlertsDropdown />

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
