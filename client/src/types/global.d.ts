export interface CarData {
  _id: string;
  owner: string; // probably a user ID
  brand: string;
  model: string;
  image: string; // assuming car_image1 is a string path or URL
  year: number;
  category: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  pricePerDay: number;
  location: string;
  description: string;
  isAvailable: boolean;
  createdAt: string; // ISO date string, can also use Date if you parse it
}

export interface CarBookingData {
  _id: string;
  car: CarData; // reference to the booked car
  user: string; // user who booked (userId)
  owner: string; // owner of the car (ownerId)
  pickupDate: string; // ISO date string
  returnDate: string; // ISO date string
  status: "pending" | "confirmed" | "cancelled"; // restrict to valid statuses
  price: number; // total booking price
  createdAt: string; // ISO date string
}

type DashboardData = {
  totalCars: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: CarBookingData[];
  monthlyRevenue: number;
};

export interface Testimonials {
  name: string;
  image: string;
  location: string;
  testimonial: string;
}
