import type { ReactNode } from "react";

import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

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

        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
