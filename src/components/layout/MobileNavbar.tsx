
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  UtensilsCrossed, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFamily } from "@/contexts/FamilyContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const menuItems = [
  { icon: Calendar, label: "Calendar", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: UtensilsCrossed, label: "Meal Plan", path: "/meal-plan" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Users, label: "Family", path: "/family" },
];

const MobileNavbar: React.FC = () => {
  const { activeProfile, profiles, setActiveProfile } = useFamily();
  const location = useLocation();

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">Family Organizer</h1>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`bg-${activeProfile?.color}`}>
                  {activeProfile?.avatar}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {profiles.map((profile) => (
              <DropdownMenuItem 
                key={profile.id} 
                onClick={() => setActiveProfile(profile)}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback className={`bg-${profile.color}`}>
                      {profile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span>{profile.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex border-t">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-1 flex-col items-center justify-center py-2",
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
