
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Lock, Download, UserRound } from "lucide-react";

const PrivacySettings: React.FC = () => {
  const { toast } = useToast();
  
  // Privacy settings state
  const [locationSharing, setLocationSharing] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  const [showProfileInfo, setShowProfileInfo] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordDrawerOpen, setPasswordDrawerOpen] = useState(false);
  
  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const savePrivacySettings = () => {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been saved successfully.",
    });
  };
  
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordDrawerOpen(false);
  };
  
  const handleDataExport = () => {
    toast({
      title: "Data export requested",
      description: "Your data will be prepared for download. You'll receive an email when it's ready.",
    });
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy settings and account security preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Privacy Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="location-sharing">Location Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Share your location with family members
                </p>
              </div>
              <Switch
                id="location-sharing"
                checked={locationSharing}
                onCheckedChange={setLocationSharing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity-status">Activity Status</Label>
                <p className="text-sm text-muted-foreground">
                  Show when you're online or last active
                </p>
              </div>
              <Switch
                id="activity-status"
                checked={activityStatus}
                onCheckedChange={setActivityStatus}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-profile-info">Profile Information</Label>
                <p className="text-sm text-muted-foreground">
                  Make your profile visible to other family members
                </p>
              </div>
              <Switch
                id="show-profile-info"
                checked={showProfileInfo}
                onCheckedChange={setShowProfileInfo}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Security Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
            
            <Drawer open={passwordDrawerOpen} onOpenChange={setPasswordDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Change Password</DrawerTitle>
                  <DrawerDescription>
                    Update your password to keep your account secure.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Data Controls</h3>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDataExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Request Data Export
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full"
            >
              <UserRound className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={savePrivacySettings}>
            Save Privacy Settings
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PrivacySettings;
