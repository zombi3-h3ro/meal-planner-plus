
import React, { useState } from "react";
import { useFamily } from "@/contexts/FamilyContext";
import MessageList from "@/components/messages/MessageList";
import AddMessageForm from "@/components/messages/AddMessageForm";
import HandwrittenNoteForm from "@/components/messages/HandwrittenNoteForm";
import CreatePollForm from "@/components/messages/CreatePollForm";
import PollDisplay from "@/components/messages/PollDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Pencil, BarChart3 } from "lucide-react";

const Messages: React.FC = () => {
  const { polls } = useFamily();
  const [activeTab, setActiveTab] = useState<string>("message");
  
  const activePolls = polls.filter(poll => poll.isActive);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Share updates, announcements, and polls with your family
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <MessageList />
          
          {activePolls.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> Active Polls
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {activePolls.map(poll => (
                  <PollDisplay key={poll.id} poll={poll} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="message" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> Text
              </TabsTrigger>
              <TabsTrigger value="note" className="flex items-center gap-1">
                <Pencil className="h-3 w-3" /> Note
              </TabsTrigger>
              <TabsTrigger value="poll" className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" /> Poll
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="message">
              <Card>
                <CardHeader>
                  <CardTitle>New Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddMessageForm />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="note">
              <HandwrittenNoteForm />
            </TabsContent>
            
            <TabsContent value="poll">
              <CreatePollForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Messages;
