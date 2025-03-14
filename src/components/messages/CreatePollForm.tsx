
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFamily } from "@/contexts/FamilyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Plus, Send, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  options: z.array(z.string()).min(2, "Add at least 2 options"),
  expiresAt: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreatePollForm: React.FC = () => {
  const { activeProfile, addPoll } = useFamily();
  const [options, setOptions] = useState<string[]>(["", ""]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: ["", ""],
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!activeProfile) return;
    
    const pollOptions = data.options
      .filter(opt => opt.trim() !== "")
      .map(text => ({
        id: crypto.randomUUID(),
        text,
        votes: [],
      }));
      
    addPoll({
      question: data.question,
      options: pollOptions,
      createdBy: activeProfile.id,
      expiresAt: data.expiresAt,
    });
    
    form.reset();
    setOptions(["", ""]);
  };

  const addOption = () => {
    const currentOptions = form.getValues().options || [];
    setOptions([...currentOptions, ""]);
    form.setValue("options", [...currentOptions, ""]);
  };

  const removeOption = (index: number) => {
    const currentOptions = [...form.getValues().options];
    if (currentOptions.length <= 2) return;
    
    currentOptions.splice(index, 1);
    setOptions(currentOptions);
    form.setValue("options", currentOptions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Poll</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="What do you want to ask?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Options</FormLabel>
              {form.getValues().options.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input 
                            placeholder={`Option ${index + 1}`} 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              const newOptions = [...options];
                              newOptions[index] = e.target.value;
                              setOptions(newOptions);
                            }}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                          disabled={form.getValues().options.length <= 2}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addOption}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Option
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ends On (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Set end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Create Poll
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreatePollForm;
