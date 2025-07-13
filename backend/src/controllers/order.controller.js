
import { razorpayIntance } from "../utils/razorpay.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import Vehicle from "../models/vehicle.model.js"
import Booking from "../models/booking.model.js"

export const createOrderController = asyncHandler(
    async (req, res) => {
        const { vehicleId, hours, pickupDate, pickupTime } = req.body;
        const userId = req.user._id;
        if (!vehicleId || !hours) {
            return res.status(400).json(
                {
                    
                    success: false,
                    data: new ApiResponse(404, null, "Vehicle ID and hours are required")
                }
            )
        }

        let vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                data: new ApiResponse(404, null, "Vehicle not found")
            })
        }
        if (!vehicle.availability) {
            return res.status(400).json({
                success: false,
                data: new ApiResponse(400, null, "Vehicle is not available for booking")
            })
        }

        vehicle = await Vehicle.findByIdAndUpdate(vehicleId, {
            availability: false,
        })

        const booking = await Booking.create({
            userId,
            vehicleId,
            pickupDate,
            pickupTime,
            pickupLocation: vehicle.subLocation,
            totalAmount: hours * vehicle.rentalRate,
            status: "pending",
            paymentStatus: "pending",
            paymentMethod: "razorpay",
        });
        if (!booking) {
            return res.status(500).json({
                success: false,
                data: new ApiResponse(500, null, "Failed to create booking")
            })

        }

        const rentalRate = vehicle.rentalRate;
        const options = {
            amount: Number(rentalRate * hours * 100),
            currency: "INR",
            receipt: `receipt_${vehicleId}`,
            notes: {
                vehicleId,
                hours
            }
        };

        try {
            try {
                const order = await razorpayIntance().orders.create(options);
                return res.status(200).json({
                    data: new ApiResponse(200, { ...order, bookingId: booking._id }, "Order created successfully"),
                })
            } catch (error) {
                console.log(error)
                vehicle = await Vehicle.findByIdAndUpdate(vehicleId, {
                    availability: true,
                });
                return res.status(500).json({
                    success: false,
                    data: new ApiResponse(500, null, "Failed to create order with Razorpay")
                });
                
            }
            
        } catch (error) {
            console.log(error.message)
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    statusCode: error.statusCode
                })
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    statusCode: 500
                });
            }
        }
    }
)

export const verifyPaymentController = asyncHandler(
    async (req, res) => {
        try {
            const { orderId, paymentId, signature, bookingId } = req.body;
            
            console.log("Received payment verification request:", { orderId, paymentId, signature, bookingId });
            console.log("Request body:", req.body);
            
            if (!orderId || !paymentId || !signature) {
                return res.status(400).json({
                    success: false,
                    data: new ApiResponse(400, null, "Order ID, Payment ID and Signature are required")
                })
            }

            if (!bookingId) {
                return res.status(400).json({
                    success: false,
                    data: new ApiResponse(400, null, "Booking ID is required")
                })
            }

            if (!process.env.RAZORPAY_KEY_SECRET) {
                return res.status(500).json({
                    success: false,
                    data: new ApiResponse(500, null, "Payment verification configuration error")
                })
            }

            const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
            hmac.update(orderId + "|" + paymentId);
            const generatedSignature = hmac.digest('hex');

            let data = {
                orderId,
                paymentId
            }
            
            if (generatedSignature !== signature) {
                return res.status(400).json({
                    success: false,
                    data: new ApiResponse(400, data, "Invalid signature")
                })
            }

            console.log("Signature verified successfully, updating booking:", bookingId);

            const booking = await Booking.findByIdAndUpdate(
                bookingId, 
                {
                    status: "confirmed",
                    paymentStatus: "paid",
                    transactionId: paymentId,
                }, 
                { new: true } // Return the updated document
            );
            
            console.log("Booking update result:", booking);
            
            if (!booking) {
                console.log("Booking not found with ID:", bookingId);
                return res.status(404).json({
                    success: false,
                    data: new ApiResponse(404, null, "Booking not found")
                })
            }
            
            return res.status(200).json({
                success: true,
                data: new ApiResponse(200, data, "Payment verified successfully")
            })


        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    statusCode: error.statusCode
                })
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    statusCode: 500
                });
            }
        }
    }
)

export const getAllOrder = asyncHandler(
    async(req,res) => {
        try {
          const userId = req.user._id;
          
          //Pagination parameter 
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const skip = (page-1) * limit;


          //Sorting parameter
          const sortBy = req.query.sortBy ||"pickupDate";
          const sortOrder = req.query.sortOrder === "desc"  ? -1 :1;
          const status = req.query.status  || "confirmed";

          const allBooking = await Booking.find({
            userId:userId,
            status:status
          }).sort({[sortBy]: sortOrder}).skip(skip).limit(limit);

          if(!allBooking || allBooking.length ===0){
            throw new ApiError(404,"Sorry, no bookings found");
          }

          const totaBookings = await Booking.countDocuments({
            userId:userId,
            status:status
          })

          return res.status(200).json({
            success:true,
            data: new ApiResponse(200,{
                bookings:allBooking,
                totalPages:Math.ceil(totaBookings/limit)
            },"Success")
          })
          
        } catch (error) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message,
                    statusCode:error.statusCode
                })

            }
            return res.status(500).json({
                success:false,
                message :"Internal Server Error",
                statusCode:500
            })
        }
    }
)


