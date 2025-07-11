import React, { useState } from 'react';
import { showNav } from '../state/navHideSlice';
import { ProductCard } from "../components/ProductCard.jsx";
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
import { MapPin, Calendar, Clock } from "lucide-react";
import { Spinner } from "../components/ui/Spinner.jsx";
import { useFetchVehicles } from "../utils/fetchRentals.js";
import { useNavigate } from "react-router-dom"
function Rentals() {
  showNav();


  const { data: fetchData, isLoading, error, isError } = useFetchVehicles();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <p className="text-red-400 text-lg font-semibold">Error: {error.message}</p>
      </div>
    );
  }

  const data = fetchData?.data?.data || [];
  return (
    <>
      <MainContent data={data} />
      <style jsx global>{`
        /* Custom animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        /* Enhance DatePicker styling */
        .react-datepicker__input-container input {
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          }
          
        .react-datepicker__input-container input:focus {
          ring: 2px solid #3b82f6;
          border-color: #3b82f6;
        }

        /* Card hover effect */
        .vehicle-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .vehicle-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            }
            
            /* Button hover effect */
            .custom-button {
          transition: all 0.3s ease;
        }

        .custom-button:hover {
          transform: scale(1.05);
        }
        `}</style>
    </>
  );
}

const MainContent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 8;

  // Pagination logic
  const totalPages = Math.ceil(data.length / vehiclesPerPage);
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = data.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#1a2332] flex flex-col items-center justify-start py-12">
      {/* Rental Search Form */}
      <div className="p-4 mx-4 md:mx-10 mb-12 w-full max-w-5xl animate-fade-in">
        <Card className="mx-auto p-6 bg-[#16213a] border border-blue-900/20 shadow-xl rounded-xl">
          <CardContent>
            <form className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-3">
                <Label htmlFor="pickup-location" className="text-sm font-semibold flex items-center gap-2 text-gray-200">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  Pickup Location
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full bg-[#1c2a44] border-blue-900/30 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                    <SelectValue placeholder="Select city or airport" />
                  </SelectTrigger>
                  <SelectContent side="bottom" className="bg-[#1c2a44] text-gray-200 border-blue-900/30 max-h-60 overflow-y-auto">
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="goa">Goa</SelectItem>
                    <SelectItem value="kochi">Kochi</SelectItem>
                    <SelectItem value="jaipur">Jaipur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="pickup-date" className="text-sm font-semibold flex items-center gap-2 text-gray-200">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Pickup Date
                </Label>
                <DatePicker
                  placeholderText="Select pickup date"
                  className="flex h-12 w-full rounded-md border border-blue-900/30 bg-[#1c2a44] px-4 py-2 text-sm placeholder:text-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="pickup-time" className="text-sm font-semibold flex items-center gap-2 text-gray-200">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Pickup Time
                </Label>
                <Input
                  id="pickup-time"
                  type="time"
                  className="h-12 w-full bg-[#1c2a44] border-blue-900/30 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div className="flex items-end">
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md custom-button"
                >
                  Search Cars
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Cards */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8">
        {currentVehicles.map((item) => (
          <div key={item._id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent default behavior and stop event bubbling
              navigate(`/rentals/${item._id}`);
            }}
            className="vehicle-card animate-fade-in">
            <ProductCard

              make={item.make}
              model={item.model}
              rentalRate={item.rentalRate}
              availablity={item.availability}
              imageUrl={item.image.imageUrl}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-6 mt-12 mb-16">
        <Button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold custom-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </Button>
        <span className="text-gray-200 text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold custom-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Rentals;