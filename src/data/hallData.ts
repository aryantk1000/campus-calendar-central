
import { Hall } from "@/components/hall/HallCard";

export const hallData: Record<string, Hall> = {
  "lhc-1": {
    id: "lhc-1",
    name: "LHC Seminar Hall - 1",
    capacity: 80,
    location: "LHC Block, Ground Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning", "Whiteboard"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  "lhc-2": {
    id: "lhc-2",
    name: "LHC Seminar Hall - 2",
    capacity: 150,
    location: "LHC Block, First Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning", "Whiteboard", "Video Conferencing"],
    image: "https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  "des-1": {
    id: "des-1",
    name: "DES Seminar Hall - 1",
    capacity: 100,
    location: "DES Block, Second Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning", "Whiteboard"],
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  "des-2": {
    id: "des-2",
    name: "DES Seminar Hall - 2",
    capacity: 120,
    location: "DES Block, Second Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning", "Tiered Seating"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  "apex": {
    id: "apex",
    name: "APEX Auditorium",
    capacity: 1000,
    location: "APEX Block, Ground Floor",
    amenities: ["Projector", "Advanced Sound System", "Air Conditioning", "Stage", "Backstage Area", "Wheelchair Accessible"],
    image: "https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  "esb-1": {
    id: "esb-1",
    name: "ESB Seminar Hall - 1",
    capacity: 200,
    location: "ESB Block, First Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning", "Video Conferencing"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  },
  "esb-2": {
    id: "esb-2",
    name: "ESB Seminar Hall - 2",
    capacity: 250,
    location: "ESB Block, Second Floor",
    amenities: ["Projector", "Sound System", "Air Conditioning", "Video Conferencing", "Recording Equipment"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    available: true,
  }
};
