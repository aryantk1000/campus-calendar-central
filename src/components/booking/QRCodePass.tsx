
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface QRCodePassProps {
  bookingId: string;
  title: string;
  hallName: string;
  date: Date;
  startTime: string;
  endTime: string;
  bookedBy: string;
}

const QRCodePass = ({ bookingId, title, hallName, date, startTime, endTime, bookedBy }: QRCodePassProps) => {
  // Create booking data as JSON string for QR code
  const bookingData = JSON.stringify({
    id: bookingId,
    title,
    hall: hallName,
    date: format(date, "yyyy-MM-dd"),
    time: `${startTime}-${endTime}`,
    bookedBy,
  });
  
  const handleDownload = () => {
    const svg = document.getElementById("booking-qr-code");
    if (svg) {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Create an image from the SVG
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create download link
              const downloadLink = document.createElement("a");
              downloadLink.href = URL.createObjectURL(blob);
              downloadLink.download = `booking-pass-${bookingId}.png`;
              
              // Trigger download
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }
          });
        }
        
        // Clean up
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{title} - Booking Pass</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div id="booking-qr-code">
          <QRCodeSVG 
            value={bookingData} 
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        
        <div className="w-full space-y-2 text-center">
          <p className="font-medium">{hallName}</p>
          <p>{format(date, "EEEE, MMMM dd, yyyy")}</p>
          <p>{startTime} - {endTime}</p>
          <p className="text-sm text-muted-foreground">Booked by: {bookedBy}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleDownload}>Download Pass</Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodePass;
