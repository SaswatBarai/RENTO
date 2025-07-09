import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useSetLocation} from "../utils/query.util.js"

function Location() {
  const [location, setLocation] = useState("");

  const setLocationMutation = useSetLocation();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setLocationMutation.mutate(
      location,
      {
        onSuccess: (data) => {
          console.log(data)
        },
        onError:(error) => {
          console.log(error.response?.data?.message);
        } 
      }
    )
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-zinc-50/90 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 border border-zinc-200">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Set Your Location</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-zinc-800 mb-2">
              Select Your City
            </label>
            <Select onValueChange={(value) => setLocation(value)} className="w-full">
              <SelectTrigger className="h-10 w-full bg-white border-zinc-300 text-zinc-800 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent side="bottom" className="bg-white text-zinc-800 border-zinc-300">
                <SelectItem value="bhubaneswar">Bhubaneswar, India</SelectItem>
                <SelectItem value="delhi">Delhi, India</SelectItem>
                <SelectItem value="bangalore">Bangalore, India</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Location;