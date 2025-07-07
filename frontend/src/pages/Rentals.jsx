import React from 'react'
import { showNav } from '../state/navHideSlice'
import { ProductCard } from "../components/ProductCard.jsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {MapPin, Calendar, Clock } from "lucide-react";



let data = [
  {
    "make": "Honda",
    "model": "Civic",
    "year": 2022,
    "type": "car",
    "number": "NYC32145",
    "color": "Red",
    "rentalRate": 55,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-10T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car1",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724001/rento/x1car1.jpg"
    }
  },
  {
    "make": "Hyundai",
    "model": "Elantra",
    "year": 2023,
    "type": "car",
    "number": "NYC74582",
    "color": "White",
    "rentalRate": 52,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-12T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car2",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724002/rento/x1car2.jpg"
    }
  },
  {
    "make": "Ford",
    "model": "Fusion",
    "year": 2021,
    "type": "car",
    "number": "NYC56987",
    "color": "Black",
    "rentalRate": 50,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-05T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car3",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724003/rento/x1car3.jpg"
    }
  },
  {
    "make": "BMW",
    "model": "3 Series",
    "year": 2023,
    "type": "car",
    "number": "NYC11223",
    "color": "Blue",
    "rentalRate": 85,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-08T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car4",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724004/rento/x1car4.jpg"
    }
  },
  {
    "make": "Mercedes",
    "model": "C-Class",
    "year": 2022,
    "type": "car",
    "number": "NYC99887",
    "color": "Grey",
    "rentalRate": 95,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-20T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car5",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724005/rento/x1car5.jpg"
    }
  },
  {
    "make": "Kia",
    "model": "Seltos",
    "year": 2023,
    "type": "car",
    "number": "NYC45672",
    "color": "Orange",
    "rentalRate": 58,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-22T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car6",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724006/rento/x1car6.jpg"
    }
  },
  {
    "make": "Audi",
    "model": "A4",
    "year": 2021,
    "type": "car",
    "number": "NYC84231",
    "color": "Black",
    "rentalRate": 80,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-11T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car7",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724007/rento/x1car7.jpg"
    }
  },
  {
    "make": "Tesla",
    "model": "Model 3",
    "year": 2023,
    "type": "car",
    "number": "EV9001",
    "color": "White",
    "rentalRate": 100,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-25T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car8",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724008/rento/x1car8.jpg"
    }
  },
  {
    "make": "Nissan",
    "model": "Altima",
    "year": 2022,
    "type": "car",
    "number": "NYC11122",
    "color": "Silver",
    "rentalRate": 59,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-18T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car9",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724009/rento/x1car9.jpg"
    }
  },
  {
    "make": "Chevrolet",
    "model": "Malibu",
    "year": 2020,
    "type": "car",
    "number": "NYC00991",
    "color": "Gold",
    "rentalRate": 45,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-02T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car10",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724010/rento/x1car10.jpg"
    }
  },
  {
    "make": "Jeep",
    "model": "Compass",
    "year": 2023,
    "type": "car",
    "number": "NYC77777",
    "color": "Green",
    "rentalRate": 70,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-19T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car11",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724011/rento/x1car11.jpg"
    }
  },
  {
    "make": "Volkswagen",
    "model": "Passat",
    "year": 2021,
    "type": "car",
    "number": "NYC12300",
    "color": "White",
    "rentalRate": 62,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-13T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car12",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724012/rento/x1car12.jpg"
    }
  },
  {
    "make": "Skoda",
    "model": "Superb",
    "year": 2022,
    "type": "car",
    "number": "NYC76588",
    "color": "Maroon",
    "rentalRate": 63,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-06T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car13",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724013/rento/x1car13.jpg"
    }
  },
  {
    "make": "Volvo",
    "model": "S60",
    "year": 2023,
    "type": "car",
    "number": "NYC45892",
    "color": "Silver",
    "rentalRate": 82,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-26T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car14",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724014/rento/x1car14.jpg"
    }
  },
  {
    "make": "Mazda",
    "model": "6",
    "year": 2021,
    "type": "car",
    "number": "NYC66001",
    "color": "Dark Grey",
    "rentalRate": 55,
    "availablity": true,
    "mainLocation": "New York",
    "subLocation": "Manhattan",
    "lastMaintenanceDate": "2025-06-14T00:00:00.000Z",
    "image": {
      "imageId": "rento/x1car15",
      "imageUrl": "https://res.cloudinary.com/dqqxhmflr/image/upload/v1751724015/rento/x1car15.jpg"
    }
  }
]


function Rentals() {
  showNav();
  return (
    // <ProductCard></ProductCard>
    <>
      <div className='min-h-screen bg-[#0d1117] flex flex-col items-center justify-center'>

        {/* Rental Search Form */}
        <div className='p-3 m-10'>
          <Card className="mx-auto p-4 md:p-6 w-full max-w-4xl shadow-lg bg-[#101e36] border-blue-900/30">
          <CardContent>
            <form className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="pickup-location" className="text-sm font-medium flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  Pickup Location
                </Label>
                <Select>
                  <SelectTrigger className="h-10 w-full bg-[#16213a] border-blue-900/30 text-gray-300">
                    <SelectValue placeholder="Select city or airport" />
                  </SelectTrigger>
                  <SelectContent side="bottom" className="bg-[#16213a] text-gray-300 border-blue-900/30">
                    <SelectItem value="mumbai">Mumbai, India</SelectItem>
                    <SelectItem value="delhi">Delhi, India</SelectItem>
                    <SelectItem value="bangalore">Bangalore, India</SelectItem>
                    <SelectItem value="chennai">Chennai, India</SelectItem>
                    <SelectItem value="kolkata">Kolkata, India</SelectItem>
                    <SelectItem value="pune">Pune, India</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad, India</SelectItem>
                    <SelectItem value="goa">Goa, India</SelectItem>
                    <SelectItem value="kochi">Kochi, India</SelectItem>
                    <SelectItem value="jaipur">Jaipur, India</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-date" className="text-sm font-medium flex items-center gap-2 text-white">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  Pickup Date
                </Label>
                <DatePicker
                  // selected={selectedDate}
                  // onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select pickup date"
                  className="flex h-10 w-full rounded-md border border-blue-900/30 bg-[#16213a] px-3 py-2 text-sm placeholder:text-gray-500 text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-time" className="text-sm font-medium flex items-center gap-2 text-white">
                  <Clock className="h-4 w-4 text-blue-400" />
                  Pickup Time
                </Label>
                <Input
                  id="pickup-time"
                  type="time"
                  className="h-10 w-full bg-[#16213a] border-blue-900/30 text-gray-300"
                  />
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white">
                  Search Cars
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>

        <div>
          <div className=" min-h-screen mt-8 grid grid-cols-1 p-8 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example Product Cards */}
            {
            // make , model,availability,rentalRate
              data.map((item) => (
                <ProductCard
                  make={item.make}
                  model={item.model}
                  rentalRate={item.rentalRate}
                  availablity={item.availablity}
                  imageUrl={item.image.imageUrl}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Rentals