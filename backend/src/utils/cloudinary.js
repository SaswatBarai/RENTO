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
           
            return null;
        }

        if (!fs.existsSync(filePath)) {
            
            return null;
        }

      

        const response = await cloudinary.uploader.upload(filePath, {
            folder: "rento",
            resource_type: "auto",
        });

        

        fs.unlinkSync(filePath);
        return response;

    } catch (error) {
    
        
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (unlinkError) {
            
        }
        
        return null; 
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
       
        throw new Error("Failed to delete image from Cloudinary");
    }
}