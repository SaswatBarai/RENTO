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
import {useGetAllVehicle} from "../utils/query.util.js"
import {Spinner} from "../components/ui/Spinner.jsx"



function Rentals() {
  showNav();
  
  const { data:fetchData, isLoading} = useGetAllVehicle();
  let data = fetchData?.data?.data
  console.log("obj 1",fetchData?.data?.data)
  return (
    // <ProductCard></ProductCard>
    <>
      {
        isLoading ? (
          <div className='flex items-center justify-center min-h-screen'>
            <Spinner />
            </div>
            ) : (
          <MainContent data={data} />
          // <MainContent data={data} />
            )
      }
    </>
  )
}

const MainContent = ({data})=> {
  return (<>
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
                <div key={item._id}>
                  <ProductCard
                  make={item.make}
                  model={item.model}
                  rentalRate={item.rentalRate}
                  availablity={item.availablity}
                  imageUrl={item.image.imageUrl}
                />
                </div>
              ))
            }
          </div>
        </div>
      </div>
  </>)
}

export default Rentals