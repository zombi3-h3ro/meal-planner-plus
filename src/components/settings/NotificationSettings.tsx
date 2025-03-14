
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Mail, Settings } from "lucide-react";

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [calendarNotifications, setCalendarNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState("immediate");
  
  // For email test
  const [testEmail, setTestEmail] = useState("");
  
  const saveSettings = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };
  
  const sendTestEmail = () => {
    toast({
      title: "Test email sent",
      description: `A test notification email has been sent to ${testEmail}`,
    });
    setEmailDialogOpen(false);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Control how and when you receive notifications from the Family Organizer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            {emailNotifications && (
              <Collapsible className="ml-6 border-l pl-6">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                  <ChevronDown className="h-4 w-4" />
                  Email Settings
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-frequency">Email Frequency</Label>
                    <select
                      id="email-frequency"
                      value={emailFrequency}
                      onChange={(e) => setEmailFrequency(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="immediate">Immediately</option>
                      <option value="hourly">Hourly Digest</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Summary</option>
                    </select>
                  </div>
                  
                  <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Test Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Test Notification</DialogTitle>
                        <DialogDescription>
                          This will send a test email to verify your notification settings.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="test-email">Email Address</Label>
                          <Input
                            id="test-email"
                            placeholder="your.email@example.com"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={sendTestEmail}>
                          Send Test
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CollapsibleContent>
              </Collapsible>
            )}
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminder-notifications" className="text-base">Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded before events and due dates
                </p>
              </div>
              <Switch
                id="reminder-notifications"
                checked={reminderNotifications}
                onCheckedChange={setReminderNotifications}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Categories</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="message-notifications">Messages</Label>
                <p className="text-sm text-muted-foreground">
                  New messages and replies
                </p>
              </div>
              <Switch
                id="message-notifications"
                checked={messageNotifications}
                onCheckedChange={setMessageNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="calendar-notifications">Calendar Events</Label>
                <p className="text-sm text-muted-foreground">
                  Upcoming and changed events
                </p>
              </div>
              <Switch
                id="calendar-notifications"
                checked={calendarNotifications}
                onCheckedChange={setCalendarNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="task-notifications">Tasks</Label>
                <p className="text-sm text-muted-foreground">
                  Task assignments and due dates
                </p>
              </div>
              <Switch
                id="task-notifications"
                checked={taskNotifications}
                onCheckedChange={setTaskNotifications}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveSettings}>
            Save Notification Settings
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default NotificationSettings;
