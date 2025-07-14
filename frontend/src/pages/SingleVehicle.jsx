import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Battery, Users, Zap, Calendar, Clock, Gauge } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetVehicleById } from "../utils/query.util.js";
import { Spinner } from "../components/ui/Spinner.jsx";
import { useEffect, useState } from "react";
import { useCreateOrder, useVerifyPayment } from "../utils/query.util.js";
import { toast, Bounce } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowNav } from "../utils/showNav.util.js";
import { scrollToTop } from "../utils/ScrollToTop.js";

export function SingleVehicle() {
  const { vehicleId } = useParams();
  const [hours, setHours] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [isbookLoading, setIsBookLoading] = useState(false);
  // CHANGE: Added state to track Razorpay SDK loading
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const createOrderMutation = useCreateOrder();
  const useVerifyPaymentMutation = useVerifyPayment();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  ShowNav();

  // CHANGE: Added useEffect to dynamically load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay SDK loaded:", window.Razorpay); // Debug log
      setIsRazorpayLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      toast.error("Failed to load payment gateway. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToTop();
      console.log("hello");
    }, 10);
    return () => clearTimeout(timer);
  }, [vehicleId]);

  const { data, isLoading, error } = useGetVehicleById(vehicleId);
  if (error) {
    toast.warn(`${error?.response?.data?.message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return null;
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      toast.info("Please login to continue", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/login");
      return;
    }
    if (!pickupDate || !pickupTime || !hours) {
      toast.warn("Please fill all the details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    // CHANGE: Check if Razorpay SDK is loaded before proceeding
    if (!isRazorpayLoaded) {
      toast.error("Payment gateway is not loaded. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsBookLoading(false);
      return;
    }
    setIsBookLoading(true);
    createOrderMutation.mutate(
      {
        vehicleId,
        hours,
        pickupDate,
        pickupTime,
      },
      {
        onSuccess: (data) => {
          let fetchedData = data?.data;
          const { id, amount, bookingId } = fetchedData.data;
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "RENTO",
            description: "Payment for booking",
            order_id: id,
            handler: async (response) => {
              // CHANGE: Updated response field names to match Razorpay SDK
              const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = response;
              useVerifyPaymentMutation.mutate(
                {
                  orderId,
                  paymentId,
                  signature,
                  bookingId,
                },
                {
                  onSuccess: (data) => {
                    console.log("Payment verification data:", data);
                    const verifyData = data?.data;
                    if (verifyData.success) {
                      toast.success(verifyData.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                      });
                    }
                    // CHANGE: Reset loading state on success
                    setIsBookLoading(false);
                    navigate("/bookings");
                  },
                  onError: (error) => {
                    console.error("Payment verification error:", error);
                    // CHANGE: Added error handling for payment verification
                    toast.error("Payment verification failed. Please try again.", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                    setIsBookLoading(false);
                  },
                }
              );
            },
            theme: {
              color: "#5f63b8",
            },
          };
          // CHANGE: Wrapped Razorpay initialization in try-catch
          try {
            const rzp = new window.Razorpay(options);
            rzp.open();
          } catch (error) {
            console.error("Razorpay initialization error:", error);
            toast.error("Failed to initialize payment. Please try again.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            setIsBookLoading(false);
          }
        },
        onError: (error) => {
          console.error("Order creation error:", error);
          // CHANGE: Added error handling for order creation
          toast.error("Failed to create order. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setIsBookLoading(false);
        },
      }
    );
  };

  const fetchedData = data?.data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <p className="text-red-400 text-lg font-semibold">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#1a2332] text-white">
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-lg border-b border-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/rentals" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Rentals
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src="/placeholder.svg"
                alt="Electric Scooter"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl border border-blue-900/30 bg-[#16213a] shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <Badge className="absolute top-4 left-4 bg-green-500/90 text-white border-0">
                Available
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Electric
                </Badge>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">(4.8)</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {fetchedData?.make} {fetchedData?.model}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed">
                {fetchedData?.description ||
                  "Experience the future of urban mobility with our premium electric scooter. Zero emissions, instant torque, and smart connectivity make every ride efficient and enjoyable."}
              </p>

              <div className="flex items-center gap-6">
                <div className="text-4xl font-bold text-blue-400">₹{fetchedData?.rentalRate}</div>
                <div className="text-gray-400">/hour</div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#16213a]/50 border-blue-900/30 p-4">
                <div className="flex items-center gap-3">
                  <Battery className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-semibold text-white">{fetchedData?.range} km</div>
                    <div className="text-sm text-gray-400">Range per charge</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#16213a]/50 border-blue-900/30 p-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-white">{fetchedData?.motorPower / 1000} kW</div>
                    <div className="text-sm text-gray-400">Motor power</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#16213a]/50 border-blue-900/30 p-4">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">{fetchedData?.maxSpeed} km/h</div>
                    <div className="text-sm text-gray-400">Top speed</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#16213a]/50 border-blue-900/30 p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white">2 Rider</div>
                    <div className="text-sm text-gray-400">Comfortable seating</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Booking Form */}
            <Card className="bg-[#16213a]/70 border-blue-900/30 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">Book This Vehicle</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        Pickup Date
                      </Label>
                      <input
                        type="date"
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg bg-[#1c2a44] border border-blue-900/30 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        Pickup Time
                      </Label>
                      <input
                        type="time"
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg bg-[#1c2a44] border border-blue-900/30 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col w-1/3">
                    <Label className="text-white">Rental Duration</Label>
                    <Input
                      type="number"
                      id="hours"
                      className="h-11 bg-[#1c2a44] rounded-[8px] border-blue-900/30 text-gray-200 focus:ring-2 focus:ring-blue-500 p-5"
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="Enter hours"
                      min="1"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={(e) => HandleSubmit(e)}
                      disable = {isLoading}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {isbookLoading ? (
                        <>
                          <Spinner className="animate-spin h-5 w-5 text-white" />
                          Loading...
                        </>
                      ) : (
                        <>Book Now - ₹{fetchedData?.rentalRate * hours}</>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vehicle Details Section */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <Card className="bg-[#16213a]/30 border-blue-900/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Battery className="w-6 h-6 text-green-400" />
              Electric Scooter Details
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                This premium electric scooter represents the perfect blend of performance, efficiency, and smart technology.
                With zero emissions and instant torque delivery, experience a smooth and silent ride that's perfect for urban
                commuting and city exploration.
              </p>
              <p className="leading-relaxed">
                Equipped with regenerative braking, smart connectivity features, and a robust build quality, this electric
                scooter ensures a reliable and eco-friendly transportation solution.
              </p>
            </div>
          </Card>

          <Card className="bg-[#16213a]/30 border-blue-900/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                "3.97 kWh removable battery",
                "Fast charging (0-80% in 18 mins)",
                "Regenerative braking system",
                "Digital instrument cluster",
                "Bluetooth connectivity",
                "Mobile app integration",
                "LED lighting (headlight & taillight)",
                "Anti-theft alarm system",
                "Side-stand sensor",
                "Riding modes (Normal, Sport, Eco)",
                "Weather-resistant design",
                "Spacious under-seat storage",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {feature}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}