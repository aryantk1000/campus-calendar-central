
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  bookedDates: Date[];
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date | null;
}

const BookingCalendar = ({ bookedDates, onSelectDate, selectedDate }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      isSameDay(bookedDate, date)
    );
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">{format(currentMonth, dateFormat)}</h2>
        </div>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border-t">
        <div className="grid grid-cols-7 bg-muted/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isBookedDate = isDateBooked(day);
            const dayClassName = `calendar-day ${isCurrentMonth ? "text-foreground" : "text-muted-foreground opacity-50"} ${isToday(day) ? "today" : ""} ${isSelected ? "selected" : ""}`;
            
            return (
              <button
                key={i}
                className={dayClassName}
                onClick={() => onSelectDate(day)}
                disabled={!isCurrentMonth || isBookedDate}
              >
                <span className="text-sm">{format(day, "d")}</span>
                {isBookedDate && isCurrentMonth && (
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
