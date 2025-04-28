
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface SmartSuggestionProps {
  onSelectSuggestion: (suggestion: BookingSuggestion) => void;
}

export interface BookingSuggestion {
  hallId: string;
  hallName: string;
  date: Date;
  startTime: string;
  endTime: string;
  confidence: number;
}

// This would normally come from an API with AI predictions
const mockSuggestions: BookingSuggestion[] = [
  {
    hallId: "lhc-1",
    hallName: "LHC Seminar Hall - 1",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    startTime: "10:00",
    endTime: "12:00",
    confidence: 95,
  },
  {
    hallId: "des-1",
    hallName: "DES Seminar Hall - 1",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "14:00",
    endTime: "16:00",
    confidence: 87,
  },
  {
    hallId: "esb-2",
    hallName: "ESB Seminar Hall - 2",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    startTime: "09:00",
    endTime: "11:00",
    confidence: 82,
  },
];

const SmartSuggestions = ({ onSelectSuggestion }: SmartSuggestionProps) => {
  const [suggestions, setSuggestions] = useState<BookingSuggestion[]>(mockSuggestions);
  const [loading, setLoading] = useState(false);
  
  const handleRefreshSuggestions = () => {
    setLoading(true);
    
    // Simulate API call for new suggestions
    setTimeout(() => {
      // Just shuffle the existing ones for the demo
      setSuggestions([...suggestions].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 1000);
  };
  
  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-100 text-green-800";
    if (confidence >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-orange-100 text-orange-800";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Smart Suggestions
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshSuggestions}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </CardTitle>
        <CardDescription>
          AI-powered suggestions based on your booking history and availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="border rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{suggestion.hallName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(suggestion.date, "EEEE, MMMM dd")} • {suggestion.startTime} - {suggestion.endTime}
                  </p>
                </div>
                <Badge className={getConfidenceBadgeColor(suggestion.confidence)}>
                  {suggestion.confidence}% match
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
