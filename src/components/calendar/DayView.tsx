
import React from "react";
import { format, addHours, startOfDay } from "date-fns";
import { useFamily } from "@/contexts/FamilyContext";
import { cn } from "@/lib/utils";

const DayView: React.FC = () => {
  const { selectedDate, events } = useFamily();
  
  // Create hour slots for the day (7am to 9pm)
  const dayStart = startOfDay(selectedDate);
  const hours = Array.from({ length: 15 }, (_, i) => addHours(dayStart, i + 7));
  
  // Filter events for the selected day
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getDate() === selectedDate.getDate() && 
           eventDate.getMonth() === selectedDate.getMonth() && 
           eventDate.getFullYear() === selectedDate.getFullYear();
  });

  const getEventsForHour = (hour: Date) => {
    return dayEvents.filter(event => {
      const eventHour = new Date(event.start).getHours();
      return eventHour === hour.getHours();
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[80px_1fr] divide-x">
        <div className="text-center py-2 bg-muted/30 font-semibold">
          Time
        </div>
        <div className="text-center py-2 bg-muted/30 font-semibold">
          {format(selectedDate, "EEEE, MMMM d")}
        </div>
      </div>
      
      <div className="divide-y">
        {hours.map((hour, idx) => {
          const hourEvents = getEventsForHour(hour);
          
          return (
            <div key={idx} className="grid grid-cols-[80px_1fr] divide-x">
              <div className="text-xs p-2 text-muted-foreground text-center">
                {format(hour, "h:mm a")}
              </div>
              <div className="min-h-[60px] p-1 relative">
                {hourEvents.map(event => (
                  <div 
                    key={event.id}
                    className={cn(
                      "mb-1 rounded px-2 py-1 text-xs text-white shadow",
                      `bg-${event.profileId ? events.find(e => e.id === event.id)?.profileId === "1" ? "family-blue" : 
                        events.find(e => e.id === event.id)?.profileId === "2" ? "family-green" : 
                        events.find(e => e.id === event.id)?.profileId === "3" ? "family-purple" : 
                        events.find(e => e.id === event.id)?.profileId === "4" ? "family-orange" : "family-blue" : "family-blue"}`
                    )}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-90">
                      {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                    </div>
                    {event.location && (
                      <div className="text-xs opacity-90">{event.location}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
