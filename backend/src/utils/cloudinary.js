import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true, // Always use HTTPS
});

console.log("Cloudinary configured with cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);

export const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            console.log("No file path provided");
            return null;
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist at path:", filePath);
            return null;
        }

        console.log("Uploading file to Cloudinary:", filePath);

        const response = await cloudinary.uploader.upload(filePath, {
            folder: "rento",
            resource_type: "auto",
        });

        console.log("Cloudinary upload successful:", response.public_id);

        // Remove file from local storage after successful upload
        fs.unlinkSync(filePath);
        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        
        // Try to remove the file even if upload failed
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (unlinkError) {
            console.error("Error removing file:", unlinkError);
        }
        
        return null; // Return null instead of throwing error
    }
}

export const deleteFromCloudinary = async(publicId) => {
    try {
        if(!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
        });
        return response;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("Failed to delete image from Cloudinary");
    }
}