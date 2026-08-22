import type { ReactNode } from "react";

import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";

import { SidebarInset, SidebarProvider } from "../ui/sidebar";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 pb-24 sm:p-6 sm:pb-24 md:pb-6 lg:p-8">
          {children}
        </main>

        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
