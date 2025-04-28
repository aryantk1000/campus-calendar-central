
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import BookingList, { Booking } from "@/components/booking/BookingList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// Sample admin data for the dashboard
const sampleAdminBookings: Booking[] = [
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
  {
    id: "5",
    title: "Faculty Meeting",
    hallId: "2",
    hallName: "Conference Hall A",
    date: new Date(2025, 5, 5), // June 5, 2025
    startTime: "15:00",
    endTime: "17:00",
    status: "pending",
    attendees: 30,
  },
];

const DashboardPage = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(sampleAdminBookings);
  
  const handleApproveBooking = (id: string) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status: "approved" as const } : booking
      )
    );
    
    toast({
      title: "Booking Approved",
      description: "The booking request has been approved successfully."
    });
  };
  
  const handleRejectBooking = (id: string) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status: "rejected" as const } : booking
      )
    );
    
    toast({
      title: "Booking Rejected",
      description: "The booking request has been rejected."
    });
  };
  
  // Filter bookings by status
  const pendingBookings = bookings.filter(booking => booking.status === "pending");
  const approvedBookings = bookings.filter(booking => booking.status === "approved");
  const rejectedBookings = bookings.filter(booking => booking.status === "rejected");
  
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            }
          />
          
          <StatCard
            title="Pending Approvals"
            value={pendingBookings.length}
            description="Requires your attention"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          
          <StatCard
            title="Total Halls"
            value="6"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
            }
          />
          
          <StatCard
            title="Users"
            value="125"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            }
          />
        </div>
        
        {/* Booking Management */}
        <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedBookings.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedBookings.length})</TabsTrigger>
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <BookingList 
              bookings={pendingBookings} 
              showActions={true}
              onApprove={handleApproveBooking}
              onReject={handleRejectBooking}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <BookingList bookings={approvedBookings} />
          </TabsContent>
          
          <TabsContent value="rejected">
            <BookingList bookings={rejectedBookings} />
          </TabsContent>
          
          <TabsContent value="all">
            <BookingList 
              bookings={bookings}
              showActions={true}
              onApprove={handleApproveBooking}
              onReject={handleRejectBooking}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
