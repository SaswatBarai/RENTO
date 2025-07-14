import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = asyncHandler(
    async(req, res, next) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.accessToken;
            if(!token){
                throw new ApiError(401, "You are not authorized to access this resource");
            }

            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            if(!decodedToken){
                throw new ApiError(401, "Invalid or expired token");
            }
            const user = await User.findById(decodedToken._id).select("-password -refreshToken");

            if(!user){
                throw new ApiError(401, "You are not authorized to access this resource");
            }
            req.user = user;
            next();
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
    }
)

export const adminMiddleware = asyncHandler(
    async(req,res,next) => {
        try {
            const user = req.user;
            if(!user || user.role !== "admin"){
                throw new ApiError(403, "You do not have permission to access this resource");
            }
            next();
            
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
    }
)

export const optionalAuthMiddleware = asyncHandler(
    async(req,res,next) => {
        try {
                const token = req.header?.authorization?.split(" ")[1] || req.cookies?.refreshToken;
                if(!token){
                    req.user = null
                    return next();
                }

                const decoded = await jwt.verify(token,process.env.JWT_SECRET);
                const user = await User.findById(decoded._id).select("-password -refreshToken");

                req.user = user || null;
                return next();

        } catch (error) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message: error.message,
                    statusCode:error.statusCode
                })
            }
            else{
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error",
                    statusCode:500
                })
            }
        }
    }
)