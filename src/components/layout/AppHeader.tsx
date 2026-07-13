import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
export default function AppHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Bienvenue sur TheDogMall
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />

        <Avatar>
          <AvatarFallback>JO</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}