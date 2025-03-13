
import React from "react";
import { useFamily } from "@/contexts/FamilyContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, UserPlus } from "lucide-react";

const Family: React.FC = () => {
  const { profiles, tasks } = useFamily();
  
  const getCompletedTasksCount = (profileId: string) => {
    return tasks.filter(task => task.assignedTo === profileId && task.completed).length;
  };
  
  const getPendingTasksCount = (profileId: string) => {
    return tasks.filter(task => task.assignedTo === profileId && !task.completed).length;
  };
  
  const getTotalPoints = (profileId: string) => {
    return tasks
      .filter(task => task.assignedTo === profileId && task.completed && task.points)
      .reduce((total, task) => total + (task.points || 0), 0);
  };
  
  const parents = profiles.filter(profile => profile.role === "parent");
  const children = profiles.filter(profile => profile.role === "child");
  const caregivers = profiles.filter(profile => profile.role === "caregiver");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Family</h2>
          <p className="text-muted-foreground">
            Manage family members and profiles
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add Family Member
        </Button>
      </div>
      
      {parents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Parents</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parents.map(profile => (
              <Card key={profile.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className={`bg-${profile.color} text-xl`}>
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-semibold">{profile.name}</h4>
                      <Badge variant="outline" className="mt-1">Parent</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Tasks</div>
                      <div className="mt-1 font-medium">
                        {getCompletedTasksCount(profile.id)} / {getCompletedTasksCount(profile.id) + getPendingTasksCount(profile.id)}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Points</div>
                      <div className="mt-1 font-medium">
                        {getTotalPoints(profile.id)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {children.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Children</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map(profile => (
              <Card key={profile.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className={`bg-${profile.color} text-xl`}>
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-semibold">{profile.name}</h4>
                      <Badge variant="outline" className="mt-1">Child</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Tasks</div>
                      <div className="mt-1 font-medium">
                        {getCompletedTasksCount(profile.id)} / {getCompletedTasksCount(profile.id) + getPendingTasksCount(profile.id)}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-accent/10 rounded-lg">
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Trophy className="h-3 w-3 mr-1" /> Points
                      </div>
                      <div className="mt-1 font-medium">
                        {getTotalPoints(profile.id)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {caregivers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Caregivers</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caregivers.map(profile => (
              <Card key={profile.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className={`bg-${profile.color} text-xl`}>
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-semibold">{profile.name}</h4>
                      <Badge variant="outline" className="mt-1">Caregiver</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Family;
