
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealPlanCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const MealPlanCalendar: React.FC<MealPlanCalendarProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Select a Date</h2>
        <div className="md:hidden">
          <SidebarTrigger>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SidebarTrigger>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateSelect(date)}
        className="rounded-md border"
      />
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Meal Plan Legend</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Breakfast</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Lunch</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm">Dinner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
