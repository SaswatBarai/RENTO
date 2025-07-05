import { Star, MapPin, Calendar, Clock } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Hero = ({
  heading = "Drive with Ease - Your Automobile Partner",
  description = "Your one-stop solution for rental, purchase, and servicing needs.",
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className="py-20 px-4 md:py-32">
      <div className="container mx-auto max-w-7xl text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold md:text-5xl lg:text-6xl text-white">
            {heading}
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            {description}
          </p>
        </div>

        {/* Rental Search Form */}
        <Card className="mx-auto mt-10 p-4 md:p-6 w-full max-w-4xl shadow-lg bg-[#101e36] border-blue-900/30">
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
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
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

        {/* Reviews Section */}
        <div className="mx-auto mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="w-12 h-12 border border-[#101e36]">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 font-semibold text-blue-300">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-400 font-medium">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
