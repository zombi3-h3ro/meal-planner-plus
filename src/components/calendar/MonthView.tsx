
import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { useFamily } from "@/contexts/FamilyContext";
import { cn } from "@/lib/utils";
import CalendarEvent from "./CalendarEvent";

const MonthView: React.FC = () => {
  const { selectedDate, events } = useFamily();

  // Get all days in the month
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      return isSameDay(eventStart, day);
    });
  };

  return (
    <div className="border rounded-lg">
      <div className="grid grid-cols-7 bg-muted/20">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-2 text-sm font-medium text-center text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div
              key={dayIdx}
              className={cn(
                "calendar-day",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isToday(day) && "calendar-day-today"
              )}
            >
              <div className="text-right text-sm">
                {format(day, "d")}
              </div>
              <div className="mt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <CalendarEvent key={event.id} event={event} />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center mt-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
