
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MealPlanCalendar from "@/components/meal-plan/MealPlanCalendar";
import AddMealForm from "@/components/meal-plan/AddMealForm";
import MealsList from "@/components/meal-plan/MealsList";
import { useFamily } from "@/contexts/FamilyContext";

const MealPlan: React.FC = () => {
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();
  const { activeProfile } = useFamily();

  const handleAddMealClick = () => {
    setIsAddingMeal(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMealAdded = () => {
    setIsAddingMeal(false);
    toast({
      title: "Meal added",
      description: "Your meal has been added to the plan",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meal Planning</h1>
        {!isAddingMeal && (
          <Button onClick={handleAddMealClick}>Add Meal</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <MealPlanCalendar 
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          {isAddingMeal ? (
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Add Meal</h2>
                <AddMealForm 
                  selectedDate={selectedDate}
                  onCancel={() => setIsAddingMeal(false)}
                  onMealAdded={handleMealAdded}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <MealsList selectedDate={selectedDate} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
