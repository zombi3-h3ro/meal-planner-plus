
import React from "react";
import { useFamily, EventType } from "@/contexts/FamilyContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CalendarEventProps {
  event: EventType;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const { profiles } = useFamily();
  
  const profile = profiles.find(p => p.id === event.profileId);
  const profileColor = profile ? profile.color : "family-blue";
  
  const formatTime = (date: Date) => {
    return format(new Date(date), "h:mm a");
  };

  return (
    <div 
      className={cn(
        "calendar-event",
        `bg-${profileColor}`
      )}
      title={`${event.title} - ${formatTime(event.start)} to ${formatTime(event.end)}`}
    >
      {!event.allDay && formatTime(event.start)} {event.title}
    </div>
  );
};

export default CalendarEvent;
