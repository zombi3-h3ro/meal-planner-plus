
import React from "react";
import { useFamily } from "@/contexts/FamilyContext";
import MessageList from "@/components/messages/MessageList";
import AddMessageForm from "@/components/messages/AddMessageForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Messages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Share updates and announcements with your family
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <MessageList />
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Message</CardTitle>
            </CardHeader>
            <CardContent>
              <AddMessageForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
