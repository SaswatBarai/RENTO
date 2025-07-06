import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}));
app.use(morgan("dev"));

import authRoutes from "./routes/auth.route.js";
import vehicleRoutes from "./routes/vehicle.route.js"

app.use("/api/auth",authRoutes);
app.use("/api/vehicle",vehicleRoutes)
export {app};