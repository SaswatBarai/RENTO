import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();


export const razorpayIntance =  () => {
    if(!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay credentials are not set in environment variables");
    }
    const razor = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    return razor;
}