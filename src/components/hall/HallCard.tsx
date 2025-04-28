
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  location: string;
  amenities: string[];
  image: string;
  available: boolean;
}

interface HallCardProps {
  hall: Hall;
}

const HallCard = ({ hall }: HallCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={hall.image} 
          alt={hall.name}
          className="object-cover w-full h-full"
        />
        {hall.available ? (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-green-100 text-green-800">
            Available
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-red-100 text-red-800">
            Booked
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{hall.name}</h3>
        <p className="text-sm text-muted-foreground">{hall.location}</p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div>
          <span className="text-sm font-medium">Capacity:</span>
          <span className="text-sm ml-1">{hall.capacity} people</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {hall.amenities.map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/halls/${hall.id}`} className="w-full">
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HallCard;
