
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

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
  });
  
  const [submitting, setSubmitting] = useState(false);
  
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
      });
    }, 1500);
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
  
  return (
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
  );
};

export default BookingForm;
