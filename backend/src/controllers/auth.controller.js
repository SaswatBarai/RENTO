import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import {detailGoogle} from "../utils/fetchData.js"
import generator from "generate-password";

//genrate the accessToken and refreshToken
const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const registerController = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if ([fullname, email, password].some((val) => val.trim() === " ")) {
      throw new ApiError(400, "All fields are required");
    }
    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists with this email");
    }
    const newUser = new User({
      fullname,
      email,
      password,
    });
    await newUser.save();

    const user = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    return res.status(201).json({
      data: new ApiResponse(201, user, "User registered successfully"),
    });
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

export const loginController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((val) => val.trim() === " ")) {
      throw new ApiError(400, "All fields are required");
    }
    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ApiError(400, "Invalid Credentails1");
    }

    const isMatch = await existingUser.isPasswordMatch(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials2",
        statusCode: 400,
      });
    }
    const { accessToken, refreshToken } = await generateTokens(
      existingUser._id
    );
    const user = await User.findOne({ email }).select(
      "-password -refreshToken"
    );
  

    let visibleLocationForm = true;
    if(user.location || user.location.trim() !== ''){
      visibleLocationForm = false;
    }

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        data: new ApiResponse(200, {...user.toObject(),visibleLocationForm}, "User logged in successfully"),
        accessToken,
      });
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

export const googleController = asyncHandler(async (req, res) => {
  try {
    // Log the entire request body to see what we're working with
    
    const accessToken = req.body.accessToken;

    if (!accessToken) {
      throw new ApiError(
        400,
        "Google access token is required.Retry again with valid access token"
      );
    }
    
    if (typeof accessToken !== 'string' || accessToken.length < 10) {
      throw new ApiError(400, "Invalid access token format");
    }
    const user = await detailGoogle(accessToken);

    
    if (!user || !user.data || !user.data.email) {
      throw new ApiError(400, "Failed to fetch user data from Google");
    }
    const { email, name, picture } = user.data;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = new User({
        fullname: name,
        email,
        password: generator.generate({
          length: 12,
          numbers: true,
          symbols: true,
        }), 
        profilePicture: picture || "",
      });
      await newUser.save();
    }

    const NewUser = await User.findOne({ email }).select(
      "-password -refreshToken"
    );
    if (!NewUser) {
      throw new ApiError(404, "User not found");
    }

    const { accessToken: newAccessToken, refreshToken } = await generateTokens(
      NewUser._id
    );
    
    let visibleLocationForm = true; 
    if(NewUser.location && NewUser.location.trim() !== "") {
      visibleLocationForm = false;
    }
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        data: new ApiResponse(
          200,
          {...NewUser.toObject(),visibleLocationForm},
          "User logged in successfully with Google"
        ),
        accessToken: newAccessToken,
      });
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

export const logoutController = asyncHandler(async (req, res) => {
  try {
   
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "You are not authorized to access this resource");
    }
    await user.save({ validateBeforeSave: false });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
});

export const getNewAccessToken = asyncHandler(async (req, res) => {
  try {
    // const { refreshToken } = req.params;
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
      throw new ApiError(400, "Refresh token is required");
    }
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError(400, "Refresh Token is not valid");
    }
    const userId = decoded._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (user.refreshToken !== refreshToken) {
      throw new ApiError(401, "You are not authorized to access this resource");
    }
    const newAccesToken = await user.generateAccessToken();
    if (!newAccesToken) {
      throw new ApiError(500, "Failed to generate new access token");
    }
    return res
      .cookie("accessToken", newAccesToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        data: new ApiResponse(
          200,
          { accessToken: newAccesToken },
          "New access token generated successfully"
        ),
      });
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

export const setLocationController = asyncHandler(async(req,res) => {
  try {
    const {location} = req.body;
    if (!location) {
      throw new ApiError(400, "Location is required");
    }

    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId,{
      location
    })
    await user.save({ validateBeforeSave: false });
    const sendUser = await User.findById(user._id).select(
      "-password -refreshToken");
    return res.status(200).json({
      success: true,
      data: new ApiResponse(200, sendUser, "Location updated successfully"),
    });
    
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
})

export const getLocationController = asyncHandler(async(req,res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return res.status(200).json({
      success: true,
      data: new ApiResponse(200, user.location, "Location fetched successfully"),
    });
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
})
