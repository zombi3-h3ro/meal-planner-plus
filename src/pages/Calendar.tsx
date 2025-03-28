
import React, { useState } from "react";
import { useFamily } from "@/contexts/FamilyContext";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft } from "lucide-react";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthView from "@/components/calendar/MonthView";
import WeekView from "@/components/calendar/WeekView";
import DayView from "@/components/calendar/DayView";
import AddEventModal from "@/components/calendar/AddEventModal";

const Calendar: React.FC = () => {
  const { events, setSelectedDate } = useFamily();
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState<Date>(new Date());
  const [isDrillDown, setIsDrillDown] = useState(false);
  
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEventDate(date);
    
    // If in month view, drill down to day view
    if (view === "month") {
      setView("day");
      setIsDrillDown(true);
    } else {
      // In other views, just open the add event modal
      setIsAddEventModalOpen(true);
    }
  };

  const handleBackToCalendar = () => {
    setView("month");
    setIsDrillDown(false);
  };
  
  return (
    <div className="space-y-6">
      {isDrillDown && (
        <Button 
          variant="ghost" 
          onClick={handleBackToCalendar}
          className="mb-2 -ml-2 flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to calendar
        </Button>
      )}
      
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <CalendarHeader view={view} setView={setView} />
        <Button onClick={() => setIsAddEventModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      
      <div className="mt-6">
        {view === "month" && <MonthView onDayClick={handleDayClick} />}
        {view === "week" && <WeekView onDayClick={handleDayClick} />}
        {view === "day" && <DayView onDayClick={handleDayClick} />}
      </div>

      <AddEventModal 
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        defaultDate={selectedEventDate}
      />
    </div>
  );
};

export default Calendar;
