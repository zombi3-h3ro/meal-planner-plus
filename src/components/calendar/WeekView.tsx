
import React from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  addHours,
  startOfDay,
} from "date-fns";
import { useFamily } from "@/contexts/FamilyContext";
import { cn } from "@/lib/utils";

interface WeekViewProps {
  onDayClick: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ onDayClick }) => {
  const { selectedDate, events } = useFamily();

  // Get all days in the week
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Create hour slots for each day (7am to 9pm)
  const dayStart = startOfDay(selectedDate);
  const hours = Array.from({ length: 15 }, (_, i) => addHours(dayStart, i + 7));

  const getEventsForDayAndHour = (day: Date, hour: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, day) && eventDate.getHours() === hour.getHours();
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[80px_repeat(7,1fr)] divide-x">
        <div className="text-center py-2 bg-muted/30">
          Time
        </div>
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={cn(
              "text-center py-2 bg-muted/30 cursor-pointer hover:bg-muted/50", 
              isSameDay(day, new Date()) && "bg-primary/10"
            )}
            onClick={() => onDayClick(day)}
          >
            <div className="font-medium">{format(day, "EEE")}</div>
            <div className="text-xs text-muted-foreground">{format(day, "MMM d")}</div>
          </div>
        ))}
      </div>
      
      <div className="divide-y">
        {hours.map((hour, hourIdx) => (
          <div key={hourIdx} className="grid grid-cols-[80px_repeat(7,1fr)] divide-x">
            <div className="text-xs p-2 text-muted-foreground text-center">
              {format(hour, "h:mm a")}
            </div>
            
            {days.map((day, dayIdx) => {
              const dayHourEvents = getEventsForDayAndHour(day, hour);
              
              return (
                <div 
                  key={dayIdx} 
                  className={cn(
                    "min-h-[60px] p-1 cursor-pointer hover:bg-muted/20",
                    isSameDay(day, new Date()) && "bg-primary/5"
                  )}
                  onClick={() => onDayClick(new Date(day.setHours(hour.getHours(), hour.getMinutes())))}
                >
                  {dayHourEvents.map(event => {
                    const profileColor = event.profileId === "1" ? "family-blue" : 
                                          event.profileId === "2" ? "family-green" : 
                                          event.profileId === "3" ? "family-purple" : 
                                          event.profileId === "4" ? "family-orange" : "family-blue";
                    
                    return (
                      <div 
                        key={event.id}
                        className={cn(
                          "mb-1 rounded px-2 py-1 text-xs text-white shadow",
                          `bg-${profileColor}`
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-90 truncate">
                          {format(new Date(event.start), "h:mm a")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
