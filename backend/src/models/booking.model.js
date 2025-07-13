import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    vehicleNumber:{
        type:String,
        required:true,
        trim:true
    },
    vehicleId:{
        type:Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },
    pickupDate:{
        type:Date,//example: "2023-10-01T10:00:00Z"
        required:true
    },
    pickupTime:{
        type:String,//example: "10:00 AM"
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
        enum:["razorpay","cash"],
        default:"cash"
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