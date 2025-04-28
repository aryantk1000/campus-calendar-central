
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, User, MapPin, Tag } from "lucide-react";
import QRCodePass from "@/components/booking/QRCodePass";
import ApprovalWorkflow from "@/components/booking/ApprovalWorkflow";
import ReminderSettings from "@/components/booking/ReminderSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock booking data
const mockBooking = {
  id: "book-123",
  title: "Department Meeting",
  hallId: "lhc-1",
  hallName: "LHC Seminar Hall - 1",
  date: new Date(2025, 4, 15), // May 15, 2025
  startTime: "10:00",
  endTime: "12:00",
  status: "approved",
  attendees: 45,
  bookedBy: "Prof. Sarah Johnson",
  department: "Computer Science",
  purpose: "Meeting",
  description: "Monthly department meeting to discuss curriculum updates and research initiatives.",
};

// Sample approval workflow steps
const approvalSteps = [
  {
    name: "Department Secretary",
    role: "Initial Review",
    status: "approved" as const,
    timestamp: "May 1, 2025 - 10:23 AM",
    notes: "Verified room availability and event details."
  },
  {
    name: "Department Chair",
    role: "Department Approval",
    status: "approved" as const,
    timestamp: "May 1, 2025 - 2:45 PM",
    notes: "Approved. Priority department event."
  },
  {
    name: "Facility Manager",
    role: "Final Approval",
    status: "approved" as const,
    timestamp: "May 2, 2025 - 9:12 AM"
  }
];

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  
  // In a real app, we would fetch the booking data based on the ID
  // For this demo, we'll just use the mock data
  const booking = mockBooking;
  
  if (!booking) {
    return (
      <Layout>
        <div className="container px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The booking you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/bookings">
            <Button>View All Bookings</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/bookings" className="text-sm text-primary hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Bookings
          </Link>
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{booking.title}</h1>
            <p className="text-muted-foreground">
              Booking ID: {booking.id}
            </p>
          </div>
          {getStatusBadge(booking.status)}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="qr">QR Pass</TabsTrigger>
                <TabsTrigger value="approval">Approval Process</TabsTrigger>
                <TabsTrigger value="reminders">Reminders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p>{format(booking.date, "EEEE, MMMM dd, yyyy")}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p>{booking.startTime} - {booking.endTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p>{booking.hallName}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <User className="mr-2 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Booked By</p>
                            <p>{booking.bookedBy}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Tag className="mr-2 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Attendees</p>
                            <p>{booking.attendees} people</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Tag className="mr-2 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Department</p>
                            <p>{booking.department}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{booking.description}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel Booking</Button>
                  <Button>Edit Booking</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="qr">
                <Card>
                  <CardContent className="pt-6">
                    <QRCodePass 
                      bookingId={booking.id}
                      title={booking.title}
                      hallName={booking.hallName}
                      date={booking.date}
                      startTime={booking.startTime}
                      endTime={booking.endTime}
                      bookedBy={booking.bookedBy}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="approval">
                <Card>
                  <CardContent className="pt-6">
                    <ApprovalWorkflow steps={approvalSteps} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reminders">
                <ReminderSettings />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setActiveTab("qr")}>
                    View QR Pass
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Calendar Invite
                  </Button>
                  <Button variant="outline" className="w-full">
                    Send Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Hall Information</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {booking.hallName} has a capacity of {
                    booking.hallName.includes("LHC-1") ? 80 :
                    booking.hallName.includes("LHC-2") ? 150 :
                    booking.hallName.includes("DES-1") ? 100 :
                    booking.hallName.includes("DES-2") ? 120 :
                    booking.hallName.includes("APEX") ? 1000 :
                    booking.hallName.includes("ESB-1") ? 200 :
                    booking.hallName.includes("ESB-2") ? 250 : "unknown"
                  } people.
                </p>
                <Link to={`/halls/${booking.hallId}`}>
                  <Button variant="link" className="px-0">
                    View Hall Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingDetailPage;
