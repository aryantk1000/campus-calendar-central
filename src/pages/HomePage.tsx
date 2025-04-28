
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HallCard, { Hall } from "@/components/hall/HallCard";

// Sample data for the homepage
const featuredHalls: Hall[] = [
  {
    id: "1",
    name: "Main Auditorium",
    capacity: 500,
    location: "Main Building, Ground Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    id: "2",
    name: "Conference Hall A",
    capacity: 100,
    location: "East Wing, Second Floor",
    amenities: ["Projector", "Whiteboard", "Video Conferencing"],
    image: "https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  {
    id: "3",
    name: "Lecture Hall B",
    capacity: 150,
    location: "Science Block, First Floor",
    amenities: ["Projector", "Acoustic Optimized", "Tiered Seating"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: false,
  },
];

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Book Seminar Halls <br />with Ease
              </h1>
              <p className="text-lg opacity-90 md:pr-8">
                Streamline your event planning with our simple, efficient seminar hall booking system. Find the perfect space for your next event.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/halls">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Browse Halls
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Sign Up Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                alt="Seminar hall booking system" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-muted-foreground mt-4">
              Our booking system offers several advantages for seamless event planning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Book your preferred seminar hall with just a few clicks. Our intuitive interface makes scheduling a breeze.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Availability</h3>
              <p className="text-sm text-muted-foreground">
                Check real-time availability of seminar halls. No more double bookings or scheduling conflicts.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Simple Approval Process</h3>
              <p className="text-sm text-muted-foreground">
                Booking requests are quickly reviewed and approved. Get notified instantly about booking status.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Halls */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Halls</h2>
              <p className="text-muted-foreground mt-2">Discover our most popular seminar spaces</p>
            </div>
            <Link to="/halls">
              <Button variant="outline">View All Halls</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Book Your Next Event?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our platform today and experience the easiest way to book seminar halls for your events, presentations, and meetings.
            </p>
            <div className="pt-4">
              <Link to="/signup">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
