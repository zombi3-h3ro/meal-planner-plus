
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "./AppSidebar";
import MobileNavbar from "./MobileNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {!isMobile && <AppSidebar />}
        <div className="flex flex-col flex-1">
          {isMobile && <MobileNavbar />}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
