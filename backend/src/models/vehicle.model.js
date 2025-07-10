import mongoose,{Schema} from "mongoose";

const vehicleSchema = new Schema({
    make:{
        type:String,
        required:true,
        trim:true
    },
    model:{
        type:String,
        required:true,
        trim:true,
    },
    year:{
        type:Number,
        required:true,
        min:2018,
    },
    type:{
        type:String,
        required:true,
        enum:["Type1", "Type2", "Type3"],
        trim:true
    },
    number:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    color:{
        type:String,
        required:true,
        trim:true
    },
    rentalRate:{
        type:Number,
        required:true,
        min:0
    },
    image:{
       imageId:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
       }
    },
    availability:{
        type:Boolean,
        default:true
    },
    mainLocation:{
        type:String,
        required:true,
        trim:true
    },
    subLocation:{
        type:String,
        required:true,
        trim:true
    },
    lastMaintenanceDate:{
        type:Date,
        required:true
    },
},{
    timestamps:true
})

const Vehicle = mongoose.model("Vehicle",vehicleSchema);

export default Vehicle;