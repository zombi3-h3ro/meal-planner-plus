
import React from "react";
import { useFamily, EventType } from "@/contexts/FamilyContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Repeat } from "lucide-react";

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
        "calendar-event rounded px-1 py-0.5 mb-1 text-xs text-white truncate",
        `bg-${profileColor}`
      )}
      title={`${event.title} - ${formatTime(event.start)} to ${formatTime(event.end)}${event.location ? ` at ${event.location}` : ""}`}
    >
      <div className="flex items-center gap-1">
        {!event.allDay && <span>{formatTime(event.start)}</span>}
        <span className="truncate">{event.title}</span>
        {event.recurring && <Repeat className="h-3 w-3 ml-auto flex-shrink-0" />}
      </div>
    </div>
  );
};

export default CalendarEvent;
