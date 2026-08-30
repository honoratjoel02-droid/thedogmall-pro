import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-border bg-card px-8">
      <button
        type="button"
        aria-label="Notifications"
        className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Bell size={18} />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
      </button>

      <Avatar>
        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
          JO
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
