import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
       
    } catch (error) {
        
        process.exit(1); // Exit the process with failure   
    }
}