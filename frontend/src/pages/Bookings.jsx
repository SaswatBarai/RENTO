import React, { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "estHours", label: "Est. Hours" },
  { value: "createdAt", label: "Created At" },
];

function Bookings() {
  const [confirmed, setConfirmed] = useState("confirmed");
  const [canceled, setCanceled] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleOrder = (order) => {
    setSortOrder(order);
  };

  const resetSorting = () => {
    setSortBy("title");
    setSortOrder("asc");
  };

  return (
    <>
      
      <div className="min-h-screen bg-gray-950 p-6 text-white"> 
        <div className="flex justify-center items-center mb-8">
          <Button
            onClick={() => {
              setConfirmed("confirmed");
              setCanceled("");
            }}
            className={`${
              confirmed
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700" 
            } rounded-l-md rounded-r-none px-6 py-3 font-semibold shadow-lg transition-all duration-200`}
          >
            Confirmed
          </Button>
          <Button
            onClick={() => {
              setCanceled("canceled");
              setConfirmed("");
            }}
            
            className={`${
              canceled
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700" 
            } rounded-r-md rounded-l-none px-6 py-3 font-semibold shadow-lg transition-all duration-200`}
          >
            Cancelled
          </Button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl"> 
          <div className="flex space-x-6 items-center">
            <Select onValueChange={handleSort} value={sortBy}>
              <SelectTrigger 
                className="w-[180px] border border-gray-700 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent 
                className="bg-white text-gray-900 border border-gray-700"
              >
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="hover:bg-blue-500 hover:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleOrder} value={sortOrder}>
              <SelectTrigger 
                className="w-[100px] border border-gray-700 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              >
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent 
                className="bg-white text-gray-900 border border-gray-700"
              >
                <SelectItem value="asc" className="hover:bg-blue-500 hover:text-white">
                  Asc
                </SelectItem>
                <SelectItem value="desc" className="hover:bg-blue-500 hover:text-white">
                  Desc
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Sorting Button */}
            <Button
              onClick={resetSorting}
              variant="outline"
              className="px-6 py-2 border border-gray-700 rounded-md shadow-md bg-gray-800 text-white hover:bg-blue-600 transition-all duration-200"
            >
              Reset sorting
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Bookings;