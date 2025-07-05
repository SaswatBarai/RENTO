import { verify } from "jsonwebtoken";
import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vehicleId:{
        type:Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },
    pickupDate:{
        type:Date,
        required:true
    },
    pickupTime:{
        type:String,
        required:true
    },
    pickupLocation:{
        type:String,
        required:true,
        trim:true
    },
    dropoffDate:{
        type:Date,
        // required:true
    },
    dropoffTime:{
        type:String,
        // required:true
    },
    totalAmount:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled","completed"],
        default:"pending"
    },
    paymentStatus:{
        type:String,
        enum:["pending","paid","failed"],
        default:"pending"
    },
    paymentMethod:{
        type:String,
        enum:["credit_card","debit_card","paypal","cash"],
        default:"credit_card"
    },
    transactionId:{
        type:String,
        trim:true
    },
    
},{
    timestamps:true
})

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;