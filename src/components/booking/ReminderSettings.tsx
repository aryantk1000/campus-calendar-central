
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const ReminderSettings = () => {
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [reminderTime, setReminderTime] = useState("24h");
  
  const handleSaveSettings = () => {
    // In a real app, this would save to the user's profile
    toast({
      title: "Reminder settings updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminder Settings</CardTitle>
        <CardDescription>
          Configure when and how you want to be reminded about your bookings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-reminders">Email reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive booking reminders via email
              </p>
            </div>
            <Switch
              id="email-reminders"
              checked={emailReminders}
              onCheckedChange={setEmailReminders}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-reminders">SMS reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive booking reminders via text message
              </p>
            </div>
            <Switch
              id="sms-reminders"
              checked={smsReminders}
              onCheckedChange={setSmsReminders}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reminder-time">Reminder timing</Label>
          <Select value={reminderTime} onValueChange={setReminderTime}>
            <SelectTrigger id="reminder-time">
              <SelectValue placeholder="Select reminder time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 hour before</SelectItem>
              <SelectItem value="3h">3 hours before</SelectItem>
              <SelectItem value="24h">1 day before</SelectItem>
              <SelectItem value="48h">2 days before</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            When should we send you booking reminders
          </p>
        </div>
        
        <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default ReminderSettings;
