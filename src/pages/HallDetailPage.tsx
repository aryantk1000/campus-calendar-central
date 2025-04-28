
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import BookingCalendar from "@/components/booking/BookingCalendar";
import BookingForm from "@/components/booking/BookingForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { hallData } from "@/data/hallData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User } from "lucide-react";

// Sample booked dates (for this demo, set a few random dates as booked)
const generateBookedDates = (hallId: string): Date[] => {
  const today = new Date();
  return [
    addDays(today, 1),
    addDays(today, 3),
    addDays(today, 7),
    addDays(today, 14),
  ];
};

// Sample bookings for this hall
const generateSampleBookings = (hallId: string) => {
  const today = new Date();
  return [
    {
      id: `${hallId}-1`,
      title: "Department Meeting",
      bookedBy: "Prof. Sarah Johnson",
      date: addDays(today, 7),
      startTime: "09:00",
      endTime: "11:00",
      status: "approved"
    },
    {
      id: `${hallId}-2`,
      title: "Guest Lecture",
      bookedBy: "Prof. Michael Chen",
      date: addDays(today, 14),
      startTime: "14:00",
      endTime: "16:00",
      status: "approved"
    },
    {
      id: `${hallId}-3`,
      title: "Workshop on AI",
      bookedBy: "Dr. Lisa Murphy",
      date: addDays(today, 21),
      startTime: "10:00",
      endTime: "15:00",
      status: "pending"
    }
  ];
};

const HallDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);
  
  // Fetch hall data based on id
  const hall = id ? hallData[id] : null;
  
  // Get booked dates for this hall
  const bookedDates = id ? generateBookedDates(id) : [];
  
  // Get sample bookings for this hall
  const sampleBookings = id ? generateSampleBookings(id) : [];
  
  // If hall not found
  if (!hall) {
    return (
      <Layout>
        <div className="container px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Hall Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The seminar hall you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/halls">
            <Button>View All Halls</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setBookingDialogOpen(true);
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/halls" className="text-sm text-primary hover:underline flex items-center">
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
            Back to Halls
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hall image and details */}
          <div>
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img 
                src={hall.image} 
                alt={hall.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{hall.name}</h1>
              {hall.available ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Currently Booked
                </Badge>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Location</h2>
                <p className="text-muted-foreground">{hall.location}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium">Capacity</h2>
                <p className="text-muted-foreground">{hall.capacity} people</p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium">Amenities</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {hall.amenities.map(amenity => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium">Description</h2>
                <p className="text-muted-foreground">
                  This versatile seminar hall is perfect for conferences, lectures, and events. 
                  It offers excellent acoustics, comfortable seating, and modern amenities to 
                  ensure your event runs smoothly.
                </p>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowUpcomingBookings(!showUpcomingBookings)}
                >
                  {showUpcomingBookings ? "Hide" : "Show"}
                </Button>
              </div>
              
              {showUpcomingBookings && (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Booked By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleBookings.map(booking => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.title}</TableCell>
                          <TableCell>{format(booking.date, "MMM dd, yyyy")}</TableCell>
                          <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                          <TableCell>{booking.bookedBy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
          
          {/* Calendar and booking */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Select a Date to Book</h2>
              <BookingCalendar 
                bookedDates={bookedDates} 
                onSelectDate={handleDateSelect} 
                selectedDate={selectedDate}
              />
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this seminar hall or the booking process, 
                please don't hesitate to contact our support team.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
        
        {/* Booking dialog */}
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book {hall.name}</DialogTitle>
              <DialogDescription>
                {selectedDate && (
                  <>For {format(selectedDate, "MMMM dd, yyyy")}</>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {selectedDate && (
              <BookingForm 
                date={selectedDate}
                hallId={hall.id}
                hallName={hall.name}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default HallDetailPage;
