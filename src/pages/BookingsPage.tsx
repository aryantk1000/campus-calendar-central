
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList, { Booking } from "@/components/booking/BookingList";
import { useToast } from "@/components/ui/use-toast";

// Sample data
const sampleBookings: Booking[] = [
  {
    id: "1",
    title: "Team Project Presentation",
    hallId: "1",
    hallName: "Main Auditorium",
    date: new Date(2025, 4, 15), // May 15, 2025
    startTime: "10:00",
    endTime: "12:00",
    status: "approved",
    attendees: 45,
  },
  {
    id: "2",
    title: "Department Meeting",
    hallId: "2",
    hallName: "Conference Hall A",
    date: new Date(2025, 5, 3), // June 3, 2025
    startTime: "14:00",
    endTime: "16:00",
    status: "pending",
    attendees: 20,
  },
  {
    id: "3",
    title: "Guest Lecture Series",
    hallId: "3",
    hallName: "Lecture Hall B",
    date: new Date(2025, 4, 28), // May 28, 2025
    startTime: "09:00",
    endTime: "11:30",
    status: "rejected",
    attendees: 120,
  },
  {
    id: "4",
    title: "Workshop on AI",
    hallId: "1",
    hallName: "Main Auditorium",
    date: new Date(2025, 5, 10), // June 10, 2025
    startTime: "13:00",
    endTime: "17:00",
    status: "pending",
    attendees: 80,
  },
];

const BookingsPage = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  
  const handleCancelBooking = (id: string) => {
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled."
    });
  };
  
  // Filter bookings by status
  const pendingBookings = bookings.filter(booking => booking.status === "pending");
  const approvedBookings = bookings.filter(booking => booking.status === "approved");
  const rejectedBookings = bookings.filter(booking => booking.status === "rejected");
  
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedBookings.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedBookings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <BookingList 
              bookings={bookings} 
              showActions={true}
              onCancel={handleCancelBooking}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <BookingList 
              bookings={pendingBookings}
              showActions={true} 
              onCancel={handleCancelBooking}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <BookingList bookings={approvedBookings} />
          </TabsContent>
          
          <TabsContent value="rejected">
            <BookingList bookings={rejectedBookings} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BookingsPage;
