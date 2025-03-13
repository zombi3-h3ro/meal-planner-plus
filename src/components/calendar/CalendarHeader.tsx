
import React from "react";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFamily } from "@/contexts/FamilyContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarHeaderProps {
  view: "day" | "week" | "month";
  setView: (view: "day" | "week" | "month") => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ view, setView }) => {
  const { selectedDate, setSelectedDate } = useFamily();

  const handlePrevious = () => {
    if (view === "day") {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(newDate);
    } else if (view === "week") {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 7);
      setSelectedDate(newDate);
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const handleNext = () => {
    if (view === "day") {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(newDate);
    } else if (view === "week") {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 7);
      setSelectedDate(newDate);
    } else {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const getHeaderTitle = () => {
    if (view === "day") {
      return format(selectedDate, "EEEE, MMMM d, yyyy");
    } else if (view === "week") {
      return `Week of ${format(selectedDate, "MMMM d, yyyy")}`;
    } else {
      return format(selectedDate, "MMMM yyyy");
    }
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold tracking-tight">{getHeaderTitle()}</h2>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleToday}
        >
          Today
        </Button>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select
          value={view}
          onValueChange={(value) => setView(value as "day" | "week" | "month")}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CalendarHeader;
