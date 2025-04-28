
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HallCard from "@/components/hall/HallCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { hallData } from "@/data/hallData";

// Create an array from the hallData object
const allHalls = Object.values(hallData);

// Unique list of amenities
const allAmenities = Array.from(new Set(allHalls.flatMap(hall => hall.amenities)));

// Unique list of blocks
const allBlocks = Array.from(new Set(allHalls.map(hall => hall.location.split(',')[0].trim())));

const HallsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [blockFilter, setBlockFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | undefined>(undefined);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Filter halls based on search and filters
  const filteredHalls = allHalls.filter(hall => {
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hall.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCapacity = capacityFilter === "" || 
                          (capacityFilter === "small" && hall.capacity <= 100) ||
                          (capacityFilter === "medium" && hall.capacity > 100 && hall.capacity <= 250) ||
                          (capacityFilter === "large" && hall.capacity > 250);
    
    const matchesBlock = blockFilter === "" || 
                        hall.location.toLowerCase().includes(blockFilter.toLowerCase());
    
    const matchesAvailability = availabilityFilter === undefined || hall.available === availabilityFilter;
    
    const matchesAmenities = selectedAmenities.length === 0 || 
                           selectedAmenities.every(amenity => hall.amenities.includes(amenity));
    
    return matchesSearch && matchesCapacity && matchesBlock && matchesAvailability && matchesAmenities;
  });
  
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };
  
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar with filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h2 className="font-medium text-lg mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search halls..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="block">Block</Label>
                  <Select value={blockFilter} onValueChange={setBlockFilter}>
                    <SelectTrigger id="block" className="mt-1">
                      <SelectValue placeholder="All Blocks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Blocks</SelectItem>
                      {allBlocks.map(block => (
                        <SelectItem key={block} value={block}>{block}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                    <SelectTrigger id="capacity" className="mt-1">
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sizes</SelectItem>
                      <SelectItem value="small">Small (up to 100)</SelectItem>
                      <SelectItem value="medium">Medium (101-250)</SelectItem>
                      <SelectItem value="large">Large (251+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select 
                    value={availabilityFilter === undefined ? "" : availabilityFilter ? "available" : "booked"}
                    onValueChange={(val) => {
                      if (val === "") {
                        setAvailabilityFilter(undefined);
                      } else {
                        setAvailabilityFilter(val === "available");
                      }
                    }}
                  >
                    <SelectTrigger id="availability" className="mt-1">
                      <SelectValue placeholder="All Halls" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Halls</SelectItem>
                      <SelectItem value="available">Available Only</SelectItem>
                      <SelectItem value="booked">Booked Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <div className="space-y-2 pt-1">
                    {allAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`amenity-${amenity}`}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityToggle(amenity)}
                        />
                        <label
                          htmlFor={`amenity-${amenity}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Seminar Halls</h1>
              <p className="text-muted-foreground">
                {filteredHalls.length} {filteredHalls.length === 1 ? "hall" : "halls"} found
              </p>
            </div>
            
            {filteredHalls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHalls.map(hall => (
                  <HallCard key={hall.id} hall={hall} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No halls match your filters.</p>
                <p className="text-sm text-muted-foreground mt-1">Try changing your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HallsPage;
