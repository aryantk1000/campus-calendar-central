
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface Booking {
  id: string;
  title: string;
  hallId: string;
  hallName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "pending" | "approved" | "rejected";
  attendees: number;
}

interface BookingListProps {
  bookings: Booking[];
  showActions?: boolean;
  onCancel?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const BookingList = ({ 
  bookings, 
  showActions = false,
  onCancel,
  onApprove,
  onReject 
}: BookingListProps) => {
  
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Rejected</Badge>;
    }
  };
  
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No bookings found.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div 
          key={booking.id} 
          className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{booking.title}</h3>
              <Link to={`/halls/${booking.hallId}`} className="text-sm text-primary hover:underline">
                {booking.hallName}
              </Link>
            </div>
            {getStatusBadge(booking.status)}
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {format(booking.date, "MMMM dd, yyyy")}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {booking.startTime} - {booking.endTime}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="h-4 w-4 mr-2" />
              {booking.attendees} attendees
            </div>
          </div>
          
          {showActions && (
            <div className="mt-4 flex gap-2">
              {booking.status === "pending" && onCancel && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onCancel(booking.id)}
                >
                  Cancel
                </Button>
              )}
              
              {booking.status === "pending" && onApprove && onReject && (
                <>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => onApprove(booking.id)}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onReject(booking.id)}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;
