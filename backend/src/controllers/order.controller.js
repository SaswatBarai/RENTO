
import {razorpayIntance} from "../utils/razorpay.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import Vehicle from "../models/vehicle.model.js"
import Booking from "../models/booking.model.js"

export const createOrderController = asyncHandler(
    async(req,res) => {
        const {vehicleId, hours,pickupDate,pickupTime} = req.body;
        const userId = req.user._id;
        if (!vehicleId || !hours) {
            return res.status(400).json(
                {
                    success: false,
                    data: new ApiResponse(404, null, "Vehicle ID and hours are required")
                }
            )
        }

        const vehicle = await Vehicle.findById(vehicleId);
        if(!vehicle) {
            return res.status(404).json({
                success: false,
                data: new ApiResponse(404, null, "Vehicle not found")
            })
        }
        if(!vehicle.availability) {
            return res.status(400).json({
                success: false,
                data: new ApiResponse(400, null, "Vehicle is not available for booking")
            })
        }

        vehicle = await Vehicle.findByIdAndUpdate(vehicleId,{
            availability: false,
        })

        const booking = await Booking.create({
            userId,
            vehicleId,
            pickupDate,
            pickupTime,
            pickupLocation:vehicle.subLocation,
            totalAmount: hours * vehicle.rentalRate,
            status: "pending",
            paymentStatus: "pending",
            paymentMethod: "razorpay",
        });
        if(!booking) {
            return res.status(500).json({
                success: false,
                data: new ApiResponse(500, null, "Failed to create booking")
            })  

        }

        const rentalRate = vehicle.rentalRate; 
        const options = {
            amount: hours*rentalRate,
            currency: "INR",
            receipt: `receipt_${vehicleId}`,
            notes: {
                vehicleId,
                hours
            }
        };

        try {
            const order = await razorpayIntance.orders.create(options,(err,order)=>{
                if(err){
                    throw new ApiError(500,err.message);
                }
            })
            
            return res.status(200).json({
                data:new ApiResponse(200, {...order.toObject(),bookingId:booking._id}, "Order created successfully"),
            })
        } catch (error) {
            if(error instanceof ApiError ){
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    statusCode: error.statusCode
                })
            }
            else{
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
    async(req,res) => {
        try {

            const {orderId, paymentId, signature,bookingId} = req.body;
            if (!orderId || !paymentId || !signature) {
               return res.status(400).json({
                data:new ApiResponse(400, null, "Order ID, Payment ID and Signature are required")
               })
            }
            const hmac  = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
            hmac.update(orderId + "|" + paymentId);
            const generatedSignature = hmac.digest('hex');

            let data = {
                orderId,
                paymentId
            }
            if( generatedSignature !== signature) {
                return res.status(400).json({
                    data:new ApiResponse(400, data, "Invalid signature")
                })
            }

            const booking = await Booking.findByIdAndUpdate(bookingId,{
                status: "confirmed",
                paymentStatus: "paid",
                transactionId: paymentId,
            })
            await booking.save();
            if(!booking) {
                return res.status(404).json({
                    success: false,
                    data:new ApiResponse(404, null, "Booking not found")
                })
            }
            return res.status(200).json({
                success: true,
                data:new ApiResponse(200, data, "Payment verified successfully")
            })

            
        } catch (error) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    statusCode: error.statusCode
                })
            }
            else{
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    statusCode: 500
                });
            }
        }
    }
)


