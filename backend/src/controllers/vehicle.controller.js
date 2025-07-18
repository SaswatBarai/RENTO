import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Vehicle from "../models/vehicle.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const addVehicleController = asyncHandler(async (req, res) => {
    try {
        const {
            make,
            model,
            year,
            type,
            number,
            color,
            rentalRate,
            mainLocation,
            subLocation,
            description,
            maxSpeed,
            range,
            motorPower,
            lastMaintenanceDate,
        } = req.body;

        if (
            [make, model, type, number, color, mainLocation,description,range,motorPower,subLocation].some(
                (val) => typeof val !== "string" || val.trim() === ""
            )
        ) {
            throw new ApiError(400, "All string fields are required");
        }

        const existingVehicle = await Vehicle.findOne({ number });
        if (existingVehicle) {
            throw new ApiError(400, "Vehicle with this number already exists");
        }

        let imageLocalPath;
        if (
            req.files &&
            Array.isArray(req.files.vehicleImage) &&
            req.files.vehicleImage.length > 0
        ) {
            imageLocalPath = req.files.vehicleImage[0].path;
        } else {
            throw new ApiError(400, "Vehicle image is required");
        }

        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        if (!uploadedImage) {
            throw new ApiError(500, "Failed to upload image to Cloudinary");
        }

        const newVehicle = await Vehicle.create({
            make,
            model,
            year,
            type,
            number,
            color,
            description,
            maxSpeed,
            range,
            motorPower,
            image: {
                imageId: uploadedImage.public_id,
                imageUrl: uploadedImage.secure_url,
            },
            rentalRate,
            mainLocation,
            subLocation,
            lastMaintenanceDate,
        });

        return res.status(201).json({
            success: true,
            data: new ApiResponse(201, newVehicle, "Vehicle added successfully"),
        });
    } catch (error) {
        console.error("Error in addVehicleController:", error);
        if (error instanceof ApiError) {
            
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
        }
        return res.status(500).json({
            success: false,
            message:error.message,
            statusCode: 500,
        });
    }
});

export const removeVehicleController = asyncHandler(async (req, res) => {
    try {
        const { vehicleId } = req.params;
       
        if (!vehicleId) {
            throw new ApiError(400, "Vehicle ID is required");
        }
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            throw new ApiError(404, "Vehicle not found");
        }
        const response = await deleteFromCloudinary(vehicle.image.imageId);

        if (!response || response.result !== "ok") {
            throw new ApiError(500, "Failed to delete image from Cloudinary");
        }
        await Vehicle.findByIdAndDelete(vehicleId);

        res.status(200).json({
            success: true,
            data: new ApiResponse(200, null, "Vehicle removed successfully"),
        });
    } catch (error) {
       
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                statusCode: 500,
            });
        }
    }
});

export const getVehicleController = asyncHandler(async (req, res) => {
    try {
        const { vehicleId } = req.params;
        if (!vehicleId) {
            throw new ApiError(400, "Missing Vehicle ID");
        }
        if (!mongoose.isValidObjectId(vehicleId)) {
            throw new ApiError(400, "Invalid Vehicle ID format");
        }
        const userId = req.user?._id;

        if (userId && mongoose.isValidObjectId(userId)) {
            
            const vehicleData = await Vehicle.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(vehicleId),
                    },
                },
                {
                    $lookup: {
                        from: "bookings",
                        let: { vehicleId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$vehicleId", "$$vehicleId"] },
                                            { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                                            { $in: ["$status", ["pending", "confirmed"]] },
                                        ],
                                    },
                                },
                            },
                            { $sort: { createdAt: -1 } },
                            { $limit: 1 },
                        ],
                        as: "latestBooking",
                    },
                },
                {
                    $addFields: {
                        isBookedByUser: {
                            $cond: {
                                if: { $gt: [{ $size: "$latestBooking" }, 0] },
                                then: true,
                                else: false,
                            },
                        },
                    },
                },
                {
                    $project: {
                        latestBooking: 0,
                    },
                },
            ]);

            if (!vehicleData || vehicleData.length === 0) {
                throw new ApiError(404, "Vehicle not found");
            }

            return res.status(200).json({
                success: true,
                data: new ApiResponse(
                    200,
                    vehicleData[0],
                    "Vehicle retrieved successfully"
                ),
            });
        }

        // Case 2: If user is NOT authenticated
        else {

            const vehicle = await Vehicle.findOne({
                _id: vehicleId,
                availability: true,
            })
            // const vehicle = await Vehicle.aggregate([
            //     {
            //         $match: {
            //             _id: new mongoose.Types.ObjectId(vehicleId),
            //             availability: true,
            //         },
            //     }
            // ])
            
            if (!vehicle) {
                throw new ApiError(404, "Vehicle not found");
            }

            return res.status(200).json({
                success: true,
                data: new ApiResponse(
                    200,
                    { ...vehicle.toObject(), isBookedByUser: false },
                    "Vehicle retrieved successfully"
                ),
            });
        }
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            statusCode: 500,
        });
    }
});

export const getAllVehicleController = asyncHandler(async (req, res) => {
    try {
        const allVehicle = await Vehicle.find({
            availability: true,
        });

        if (!allVehicle || allVehicle.length === 0) {
            throw new ApiError(404, "No vehicles found");
        }

        return res.status(200).json({
            success: true,
            data: new ApiResponse(200, allVehicle, "Vehicles retrieved successfully"),
        });


    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                statusCode: error.statusCode,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                statusCode: 500,
            });
        }
    }
});

export const getVehicleByMainLocation = asyncHandler(
    async(req,res) => {
        try {
            const { mainLocation } = req.params;
            
            const vehicle =await Vehicle.find({
                $and:[
                    { mainLocation: { $regex: new RegExp(mainLocation, "i") } },
                    { availability: true }
                ]
            });

            if (!vehicle || vehicle.length === 0) {
                throw new ApiError(404, "No vehicles found at this location");
            }

            return res.status(200).json({
                success: true,
                data: new ApiResponse(200, vehicle, "Vehicles retrieved successfully"),
            });
        } catch (error) {
            if(error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    statusCode: error.statusCode,
                });
            }
            else{
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    statusCode: 500,
                });
            }
        }
    }
)


