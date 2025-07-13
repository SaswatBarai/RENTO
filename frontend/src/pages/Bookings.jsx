import React, { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, CreditCard, Hash, User, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetBookings } from "../utils/query.util.js";

const sortOptions = [
  { value: "PickupDate", label: "Pickup Date", RealName: "pickupDate" },
  { value: "PickupTime", label: "Pickup Time", RealName: "pickupTime" },
  { value: "Title", label: "Title", RealName: "name" },
];

function Bookings() {
  const [confirmed, setConfirmed] = useState("confirmed");
  const [canceled, setCanceled] = useState("");
  const [completed, setCompleted] = useState("");

  const [RsortBy, setRSortBy] = useState("PickupDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [status, setStatus] = useState("confirmed");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: bookingsData, isLoading, isError, error } = useGetBookings({
    page: currentPage,
    limit: itemsPerPage,
    sortBy: RsortBy,
    sortOrder: sortOrder,
    status: status,
  });
  
  const bookData = bookingsData?.data?.data;
  const totalPages = bookData?.totalPages || 0;
  const totalItems = bookData?.totalBookings || 0;

  console.log("From Booking", totalPages);

  if (error) {
    console.log(error?.response?.data?.message || "An error occurred while fetching bookings.");
  }

  const handleSort = (value) => {
    setRSortBy(value);
    setCurrentPage(1); 
  };

  const handleOrder = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const resetSorting = () => {
    setRSortBy("Title");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); 
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus.toLowerCase()) {
      case 'paid':
        return 'bg-green-500 hover:bg-green-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'failed':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-blue-200">Manage and track your vehicle bookings</p>
        </div>

        {/* Status Toggle Buttons */}
        <div className="flex justify-center items-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-2 rounded-lg border border-slate-700 shadow-xl">
            <Button
              onClick={() => {
                setConfirmed("confirmed");
                setCanceled("");
                setCompleted("");
                handleStatusChange("confirmed");
              }}
              className={`${
                confirmed
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              } rounded-l-md rounded-r-none px-8 py-3 font-semibold transition-all duration-300`}
            >
              Confirmed
            </Button>
            <Button
              onClick={() => {
                setCompleted("completed");
                setCanceled("");
                setConfirmed("");
                handleStatusChange("completed");
              }}
              className={`${
                completed
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-lg"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              } rounded-r-none rounded-l-none px-8 py-3 font-semibold transition-all duration-300`}
            >
              Completed
            </Button>
            
            <Button
              onClick={() => {
                setCanceled("canceled");
                setConfirmed("");
                setCompleted("");
                handleStatusChange("cancelled");
              }}
              className={`${
                canceled
                  ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              } rounded-r-md rounded-l-none px-8 py-3 font-semibold transition-all duration-300`}
            >
              Cancelled
            </Button>
          </div>
        </div>

        {/* Sorting Controls */}
        <Card className="mb-8 bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-lg">Sort & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-slate-300">Sort by</label>
                <Select onValueChange={handleSort} value={RsortBy}>
                  <SelectTrigger className="w-[200px] border-slate-600 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900 border-slate-600">
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
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-slate-300">Order</label>
                <Select onValueChange={handleOrder} value={sortOrder}>
                  <SelectTrigger className="w-[120px] border-slate-600 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900 border-slate-600">
                    <SelectItem value="asc" className="hover:bg-blue-500 hover:text-white">
                      Ascending
                    </SelectItem>
                    <SelectItem value="desc" className="hover:bg-blue-500 hover:text-white">
                      Descending
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-slate-300">Items per page</label>
                <Select onValueChange={handleItemsPerPageChange} value={itemsPerPage.toString()}>
                  <SelectTrigger className="w-[120px] border-slate-600 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900 border-slate-600">
                    <SelectItem value="5" className="hover:bg-blue-500 hover:text-white">5</SelectItem>
                    <SelectItem value="10" className="hover:bg-blue-500 hover:text-white">10</SelectItem>
                    <SelectItem value="20" className="hover:bg-blue-500 hover:text-white">20</SelectItem>
                    <SelectItem value="50" className="hover:bg-blue-500 hover:text-white">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-slate-300">Actions</label>
                <Button
                  onClick={resetSorting}
                  variant="outline"
                  className="px-6 py-2 border-slate-600 rounded-md shadow-md bg-slate-800 text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                >
                  Reset Sorting
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {bookData && (
          <div className="mb-6 text-center">
            <p className="text-slate-300">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} bookings
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Card className="bg-red-950/50 border-red-800 mb-8">
            <CardContent className="p-6">
              <p className="text-red-200 text-center">
                {error?.response?.data?.message || "An error occurred while fetching bookings."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Bookings Grid */}
        {bookData && bookData.bookings && bookData.bookings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {bookData.bookings.map((booking) => (
                <Card
                  key={booking._id}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-blue-400 flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        {booking.name}
                      </CardTitle>
                      <Badge className={`${getStatusColor(booking.status)} text-white`}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Hash className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">Vehicle:</span>
                        <span className="text-white font-mono">{booking.vehicleNumber}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">Pickup Date:</span>
                        <span className="text-white">
                          {new Date(booking.pickupDate).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">Pickup Time:</span>
                        <span className="text-white font-mono">{booking.pickupTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">Location:</span>
                        <span className="text-white">{booking.pickupLocation}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300 text-sm font-medium">Total Amount:</span>
                        <span className="text-2xl font-bold text-blue-400">
                          {formatCurrency(booking.totalAmount)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-blue-400" />
                          <span className="text-slate-300 text-sm">{booking.paymentMethod}</span>
                        </div>
                        <Badge className={`${getPaymentStatusColor(booking.paymentStatus)} text-white text-xs`}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                      
                      {booking.transactionId && (
                        <div className="mt-2 text-xs text-slate-400">
                          Transaction ID: {booking.transactionId}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300 text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="px-3 py-2 border-slate-600 bg-slate-800 text-white hover:bg-blue-600 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {/* Page Numbers */}
                      <div className="flex gap-1">
                        {getPageNumbers().map((pageNum) => (
                          <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white border-blue-500'
                                : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-500'
                            }`}
                            variant="outline"
                          >
                            {pageNum}
                          </Button>
                        ))}
                      </div>
                      
                      {/* Next Button */}
                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="px-3 py-2 border-slate-600 bg-slate-800 text-white hover:bg-blue-600 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-slate-300 text-sm">
                      Total: {totalItems} bookings
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          !isLoading && (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-xl">
              <CardContent className="p-12 text-center">
                <Car className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No bookings found</h3>
                <p className="text-slate-400">
                  {status === "confirmed" 
                    ? "You don't have any confirmed bookings yet." 
                    : "You don't have any cancelled bookings."}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default Bookings;