
import React from "react";
import { format } from "date-fns";
import { useFamily, TaskType } from "@/contexts/FamilyContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Trophy } from "lucide-react";

interface TaskItemProps {
  task: TaskType;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { profiles, toggleTaskCompletion } = useFamily();
  
  const assignee = profiles.find(p => p.id === task.assignedTo);
  
  return (
    <Card className={cn(
      "transition-opacity", 
      task.completed && "opacity-70"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            className="mt-1"
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className={cn(
                "font-medium text-lg",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              <div className="flex items-center gap-2">
                {task.points && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 bg-accent/10"
                  >
                    <Trophy className="h-3 w-3" />
                    {task.points} points
                  </Badge>
                )}
                
                {assignee && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className={`bg-${assignee.color} text-xs`}>
                      {assignee.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
            
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
            )}
            
            {task.dueDate && (
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                Due {format(new Date(task.dueDate), "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
