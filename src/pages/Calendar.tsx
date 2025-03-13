
import React, { useState } from "react";
import { useFamily } from "@/contexts/FamilyContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthView from "@/components/calendar/MonthView";
import WeekView from "@/components/calendar/WeekView";
import DayView from "@/components/calendar/DayView";

const Calendar: React.FC = () => {
  const { events } = useFamily();
  const [view, setView] = useState<"day" | "week" | "month">("month");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <CalendarHeader view={view} setView={setView} />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      
      <div className="mt-6">
        {view === "month" && <MonthView />}
        {view === "week" && <WeekView />}
        {view === "day" && <DayView />}
      </div>
    </div>
  );
};

export default Calendar;
