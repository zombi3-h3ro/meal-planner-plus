
import React from "react";
import { UtensilsCrossed, Users, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { useFamily } from "@/contexts/FamilyContext";

interface MealsListProps {
  selectedDate: Date;
}

// This would come from your database in a real app
const DEMO_MEALS = [
  {
    id: '1',
    name: 'Pancakes with Berries',
    type: 'breakfast',
    assignedTo: '1', // profile ID
    date: new Date(),
    notes: 'Use whole wheat flour',
  },
  {
    id: '2',
    name: 'Chicken Caesar Salad',
    type: 'lunch',
    assignedTo: '2',
    date: new Date(),
    notes: 'Get pre-cooked chicken to save time',
  },
  {
    id: '3',
    name: 'Spaghetti Bolognese',
    type: 'dinner',
    assignedTo: '1',
    date: new Date(),
    notes: 'Make extra sauce for freezing',
  },
];

const MealsList: React.FC<MealsListProps> = ({ selectedDate }) => {
  const { profiles } = useFamily();

  // Filter meals for the selected date
  // In a real app, you would query your database
  const mealsForDate = DEMO_MEALS.filter(
    meal => meal.date.toDateString() === selectedDate.toDateString()
  );

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast':
        return 'bg-green-500';
      case 'lunch':
        return 'bg-blue-500';
      case 'dinner':
        return 'bg-purple-500';
      case 'snack':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCookName = (assignedToId: string) => {
    const profile = profiles.find(p => p.id === assignedToId);
    return profile ? profile.name : 'Unassigned';
  };

  return (
    <div className="space-y-4">
      {mealsForDate.length > 0 ? (
        mealsForDate.map(meal => (
          <Card key={meal.id} className="overflow-hidden">
            <div className={`h-2 ${getMealTypeColor(meal.type)}`} />
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{meal.type}</p>
                </div>
              </div>
              
              {meal.notes && (
                <p className="text-sm mt-2 text-muted-foreground">{meal.notes}</p>
              )}
              
              <div className="flex items-center mt-3 text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{getCookName(meal.assignedTo)}</span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-6">
          <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No meals planned</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Plan your meals for this day
          </p>
        </div>
      )}
    </div>
  );
};

export default MealsList;
