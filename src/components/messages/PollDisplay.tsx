import React from "react";
import { useFamily, PollType } from "@/contexts/FamilyContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PollDisplayProps {
  poll: PollType;
}

const PollDisplay: React.FC<PollDisplayProps> = ({ poll }) => {
  const { profiles, activeProfile, votePoll, closePoll } = useFamily();
  
  const creator = profiles.find(p => p.id === poll.createdBy);
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0);
  
  const hasVoted = activeProfile ? 
    poll.options.some(option => option.votes.includes(activeProfile.id)) : 
    false;
    
  const handleVote = (optionId: string) => {
    if (!activeProfile || !poll.isActive) return;
    votePoll(poll.id, optionId, activeProfile.id);
  };
  
  const handleClosePoll = () => {
    closePoll(poll.id);
  };
  
  const isCreator = activeProfile && activeProfile.id === poll.createdBy;
  
  return (
    <Card className={cn(
      "border",
      !poll.isActive && "opacity-75"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{poll.question}</CardTitle>
            <div className="text-xs text-muted-foreground mt-1">
              Created by {creator?.name} on {format(new Date(poll.createdAt), "PP")}
            </div>
          </div>
          <div>
            {!poll.isActive ? (
              <Badge variant="outline" className="bg-muted flex items-center gap-1">
                <XCircle className="h-3 w-3" /> Closed
              </Badge>
            ) : poll.expiresAt ? (
              <Badge variant="outline" className="bg-primary/10 flex items-center gap-1">
                Ends {format(new Date(poll.expiresAt), "PP")}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Active
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map((option) => {
            const votePercentage = totalVotes === 0 ? 0 : Math.round((option.votes.length / totalVotes) * 100);
            const isSelected = activeProfile && option.votes.includes(activeProfile.id);
            
            return (
              <div key={option.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className={cn(
                        "font-medium",
                        isSelected && "text-primary"
                      )}
                    >
                      {option.text}
                    </div>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="text-sm font-medium">
                    {option.votes.length} {option.votes.length === 1 ? "vote" : "votes"}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Progress value={votePercentage} className="h-2 flex-1" />
                  <div className="text-xs font-medium w-8 text-right">
                    {votePercentage}%
                  </div>
                </div>
                
                {poll.isActive && !hasVoted && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-1 h-7 w-full justify-start"
                    onClick={() => handleVote(option.id)}
                  >
                    Vote for this
                  </Button>
                )}
              </div>
            );
          })}
          
          <div className="text-xs text-muted-foreground mt-2">
            {totalVotes} {totalVotes === 1 ? "vote" : "votes"} total
          </div>
          
          {poll.isActive && isCreator && (
            <Button 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={handleClosePoll}
            >
              <XCircle className="mr-2 h-4 w-4" /> Close Poll
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PollDisplay;
