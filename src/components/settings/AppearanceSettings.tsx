
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const AppearanceSettings: React.FC = () => {
  const { toast } = useToast();
  
  // These states would be tied to a global theme provider in a real app
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  const handleSave = () => {
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved successfully.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the Family Organizer looks on your device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="space-y-1">
            <Label>Theme</Label>
            <p className="text-sm text-muted-foreground">
              Select a theme preference for the interface.
            </p>
          </div>
          <RadioGroup 
            defaultValue={theme}
            onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-2 block text-center font-normal">
                  Light
                </span>
                <div className="w-full rounded-md border border-gray-200 bg-white p-2">
                  <div className="space-y-2">
                    <div className="h-2 w-10 rounded-lg bg-gray-900"></div>
                    <div className="h-2 w-full rounded-lg bg-gray-100"></div>
                    <div className="h-2 w-full rounded-lg bg-gray-100"></div>
                  </div>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-zinc-950 p-4 hover:bg-zinc-900 hover:border-zinc-800 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-2 block text-center font-normal text-white">
                  Dark
                </span>
                <div className="w-full rounded-md border border-gray-700 bg-zinc-900 p-2">
                  <div className="space-y-2">
                    <div className="h-2 w-10 rounded-lg bg-gray-300"></div>
                    <div className="h-2 w-full rounded-lg bg-gray-800"></div>
                    <div className="h-2 w-full rounded-lg bg-gray-800"></div>
                  </div>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="peer sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-2 block text-center font-normal">
                  System
                </span>
                <div className="w-full rounded-md border border-gray-200 bg-white p-2">
                  <div className="space-y-2">
                    <div className="h-2 w-10 rounded-lg bg-gray-900"></div>
                    <div className="h-2 w-full rounded-lg bg-gray-100"></div>
                    <div className="h-2 w-full rounded-lg bg-gray-100"></div>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Accessibility</h4>
            <p className="text-sm text-muted-foreground">
              Customize accessibility settings for your experience.
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions.
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility.
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceSettings;
