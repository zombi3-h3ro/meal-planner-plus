
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFamily } from "@/contexts/FamilyContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Megaphone, Send } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  isAnnouncement: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const AddMessageForm: React.FC = () => {
  const { activeProfile, addMessage } = useFamily();
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      isAnnouncement: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!activeProfile) return;
    
    addMessage({
      content: data.content,
      senderId: activeProfile.id,
      isAnnouncement: data.isAnnouncement,
    });
    
    form.reset();
    setIsAnnouncement(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="isAnnouncement"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setIsAnnouncement(checked);
                    }}
                  />
                </FormControl>
                <div className="flex items-center space-x-1 text-sm">
                  <Megaphone className="h-4 w-4" />
                  <span>Make this an announcement</span>
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="ml-auto">
            <Send className="mr-2 h-4 w-4" /> Send
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMessageForm;
