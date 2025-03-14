
import React from "react";
import { useFamily } from "@/contexts/FamilyContext";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Megaphone } from "lucide-react";

const MessageList: React.FC = () => {
  const { messages, profiles } = useFamily();
  
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No messages yet
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {sortedMessages.map((message) => {
        const sender = profiles.find(p => p.id === message.senderId);
        
        return (
          <Card key={message.id} className={cn(
            message.isAnnouncement && "border-accent"
          )}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {sender && (
                  <Avatar className="mt-1">
                    <AvatarFallback className={`bg-${sender.color}`}>
                      {sender.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{sender?.name}</div>
                      {message.isAnnouncement && (
                        <Badge 
                          variant="secondary" 
                          className="flex items-center gap-1"
                        >
                          <Megaphone className="h-3 w-3" />
                          Announcement
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(message.timestamp), "MMM d, h:mm a")}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    {message.isHandwritten ? (
                      <div className="bg-yellow-50 p-2 rounded-md shadow-sm">
                        <img 
                          src={message.content} 
                          alt="Handwritten note" 
                          className="max-w-full"
                        />
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MessageList;
