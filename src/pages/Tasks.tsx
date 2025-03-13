
import React from "react";
import { useFamily } from "@/contexts/FamilyContext";
import TaskList from "@/components/tasks/TaskList";
import AddTaskForm from "@/components/tasks/AddTaskForm";

const Tasks: React.FC = () => {
  const { tasks } = useFamily();
  
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.filter(task => !task.completed).length;
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasksCount / tasks.length) * 100) 
    : 0;
    
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage and track family tasks and chores
          </p>
        </div>
        <div className="w-full md:w-auto">
          <AddTaskForm />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-muted/40 rounded-lg p-4 text-center">
          <h3 className="text-xl font-medium">Total</h3>
          <p className="text-3xl font-bold mt-1">{tasks.length}</p>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <h3 className="text-xl font-medium">Pending</h3>
          <p className="text-3xl font-bold mt-1">{pendingTasksCount}</p>
        </div>
        <div className="bg-secondary/10 rounded-lg p-4 text-center">
          <h3 className="text-xl font-medium">Completed</h3>
          <p className="text-3xl font-bold mt-1">{completedTasksCount} ({completionPercentage}%)</p>
        </div>
      </div>
      
      <div className="mt-6">
        <TaskList />
      </div>
    </div>
  );
};

export default Tasks;
