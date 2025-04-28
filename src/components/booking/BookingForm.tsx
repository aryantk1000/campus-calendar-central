
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmartSuggestions, { BookingSuggestion } from "./SmartSuggestions";
import ApprovalWorkflow from "./ApprovalWorkflow";

interface BookingFormProps {
  date: Date;
  hallId: string;
  hallName: string;
}

const BookingForm = ({ date, hallId, hallName }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "09:00",
    endTime: "10:00",
    attendees: "",
    department: "",
    purpose: "lecture",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [showApprovalPreview, setShowApprovalPreview] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitting(true);
    
    // Show approval workflow preview
    setShowApprovalPreview(true);
    
    // Here we would normally send data to an API
    setTimeout(() => {
      // Mock API response
      console.log("Booking submitted:", {
        ...formData,
        date: format(date, "yyyy-MM-dd"),
        hallId,
      });
      
      toast({
        title: "Booking Request Submitted",
        description: `Your booking for ${hallName} on ${format(date, "MMMM dd, yyyy")} has been submitted for approval.`,
      });
      
      setSubmitting(false);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        startTime: "09:00",
        endTime: "10:00",
        attendees: "",
        department: "",
        purpose: "lecture",
      });
    }, 1500);
  };
  
  const handleSuggestionSelect = (suggestion: BookingSuggestion) => {
    // Update form with the suggested booking details
    setFormData({
      ...formData,
      startTime: suggestion.startTime,
      endTime: suggestion.endTime,
    });
    
    // You might also want to update the date and hall if your UI allows for it
    console.log("Selected suggestion:", suggestion);
    
    // Show toast to confirm
    toast({
      title: "Smart Suggestion Applied",
      description: `Applied suggestion for ${suggestion.hallName} on ${format(suggestion.date, "MMM dd")}`,
    });
  };
  
  // Generate time options
  const timeOptions = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  // Sample approval workflow steps
  const approvalSteps = [
    {
      name: "Department Secretary",
      role: "Initial Review",
      status: "approved",
      timestamp: "May 1, 2025 - 10:23 AM",
      notes: "Verified room availability and event details."
    },
    {
      name: "Department Chair",
      role: "Department Approval",
      status: "pending",
      timestamp: "Awaiting"
    },
    {
      name: "Facility Manager",
      role: "Final Approval",
      status: "pending",
      timestamp: "Awaiting"
    }
  ];
  
  return (
    <>
      {showApprovalPreview ? (
        <div className="space-y-4">
          <ApprovalWorkflow steps={approvalSteps} />
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Booking Summary</h4>
            <ul className="space-y-1 text-sm">
              <li><span className="font-medium">Event:</span> {formData.title}</li>
              <li><span className="font-medium">Date:</span> {format(date, "MMMM dd, yyyy")}</li>
              <li><span className="font-medium">Time:</span> {formData.startTime} - {formData.endTime}</li>
              <li><span className="font-medium">Hall:</span> {hallName}</li>
              <li><span className="font-medium">Department:</span> {formData.department}</li>
              <li><span className="font-medium">Attendees:</span> {formData.attendees}</li>
            </ul>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowApprovalPreview(false)}>Back</Button>
            <Button>Confirm Booking</Button>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="form">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="form">Manual Booking</TabsTrigger>
            <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Booking Details</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fill in the details for your booking on {format(date, "MMMM dd, yyyy")} at {hallName}.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Event Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Project Presentation"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">Department</label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g. Computer Science"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-medium">Purpose of Booking</label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => handleSelectChange("purpose", value)}
                >
                  <SelectTrigger id="purpose">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lecture">Lecture / Class</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="event">Special Event</SelectItem>
                    <SelectItem value="exam">Examination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your event"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium">Start Time</label>
                  <Select
                    value={formData.startTime}
                    onValueChange={(value) => handleSelectChange("startTime", value)}
                  >
                    <SelectTrigger id="startTime">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="endTime" className="text-sm font-medium">End Time</label>
                  <Select
                    value={formData.endTime}
                    onValueChange={(value) => handleSelectChange("endTime", value)}
                  >
                    <SelectTrigger id="endTime">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem 
                          key={time} 
                          value={time}
                          disabled={time <= formData.startTime}
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="attendees" className="text-sm font-medium">Expected Attendees</label>
                <Input
                  id="attendees"
                  name="attendees"
                  type="number"
                  min="1"
                  value={formData.attendees}
                  onChange={handleInputChange}
                  placeholder="Number of expected attendees"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Request Booking"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <SmartSuggestions onSelectSuggestion={handleSuggestionSelect} />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default BookingForm;
