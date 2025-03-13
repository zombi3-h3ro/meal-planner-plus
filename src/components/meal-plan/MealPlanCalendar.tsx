
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

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
      <h2 className="text-lg font-semibold">Select a Date</h2>
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
