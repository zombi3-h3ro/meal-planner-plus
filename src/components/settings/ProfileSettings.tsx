
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFamily } from "@/contexts/FamilyContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  avatar: z.string(),
  color: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileSettings: React.FC = () => {
  const { activeProfile, profiles, updateEvent } = useFamily();
  const { toast } = useToast();

  // Use active profile data as default values
  const defaultValues: Partial<ProfileFormValues> = {
    name: activeProfile?.name || "",
    email: "", // Email is not in the ProfileType, so default to empty string
    avatar: activeProfile?.avatar || "",
    color: activeProfile?.color || "family-blue",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    if (activeProfile) {
      // Since there's no direct setProfiles method, we'll use the updateEvent method
      // to update the activeProfile in the FamilyContext
      
      // Update each property one by one on the active profile
      const updatedProfile = {
        ...activeProfile,
        name: data.name,
        avatar: data.avatar,
        color: data.color,
      };
      
      // We'll use the existing activeProfile and re-set it to apply updates
      // This effectively updates the profile in the context
      if (profiles.some(p => p.id === activeProfile.id)) {
        const profileToUpdate = profiles.find(p => p.id === activeProfile.id);
        if (profileToUpdate) {
          // Since we don't have direct profile update in the context,
          // we can at least update the current active profile
          // Note: This won't persist after page reload without actual backend integration
          profileToUpdate.name = data.name;
          profileToUpdate.avatar = data.avatar;
          profileToUpdate.color = data.color;
        }
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile settings have been updated successfully.",
      });
    }
  }

  const colorOptions = [
    { value: "family-blue", label: "Blue" },
    { value: "family-green", label: "Green" },
    { value: "family-red", label: "Red" },
    { value: "family-purple", label: "Purple" },
    { value: "family-orange", label: "Orange" },
    { value: "family-teal", label: "Teal" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and how you appear in the family organizer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your display name within the family.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used for notifications and account recovery. (Note: Email is currently only saved in UI)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Initials</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="JD" 
                      maxLength={2} 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Up to 2 characters for your avatar display.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Color</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem 
                          key={color.value} 
                          value={color.value}
                          className="flex items-center gap-2"
                        >
                          <div className={`w-4 h-4 rounded-full bg-${color.value}`}></div>
                          <span>{color.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This color will be used for your events and items in the family organizer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="mt-4">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
