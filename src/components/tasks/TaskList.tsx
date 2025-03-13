
import React from "react";
import { useFamily } from "@/contexts/FamilyContext";
import TaskItem from "./TaskItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, CircleDashed } from "lucide-react";

const TaskList: React.FC = () => {
  const { tasks, profiles } = useFamily();
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <CircleDashed className="h-4 w-4" />
            <span>Pending ({pendingTasks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed ({completedTasks.length})</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          {pendingTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending tasks
            </div>
          ) : (
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {completedTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No completed tasks
            </div>
          ) : (
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
