
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  CheckSquare, 
  Users, 
  MessageSquare, 
  UtensilsCrossed, 
  Settings 
} from "lucide-react";
import { useFamily } from "@/contexts/FamilyContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Calendar, label: "Calendar", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: UtensilsCrossed, label: "Meal Plan", path: "/meal-plan" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Users, label: "Family", path: "/family" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const AppSidebar: React.FC = () => {
  const { activeProfile, profiles, setActiveProfile } = useFamily();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-white mb-4">Family Organizer</h1>
        <div className="flex space-x-2 overflow-x-auto py-2 w-full justify-center">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(profile)}
              className={cn(
                "flex flex-col items-center p-1 rounded-full transition-colors",
                activeProfile?.id === profile.id
                  ? "ring-2 ring-white"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Avatar className="h-10 w-10 bg-sidebar-accent">
                <AvatarFallback className={`bg-${profile.color}`}>
                  {profile.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1 text-white">{profile.name}</span>
            </button>
          ))}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        location.pathname === item.path
                          ? "bg-sidebar-accent text-white"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
