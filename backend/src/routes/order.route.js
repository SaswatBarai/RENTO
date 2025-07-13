import {Router} from "express";
import {createOrderController,
        verifyPaymentController,
        getAllOrder
    } from "../controllers/order.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";


const router = Router();
router.post("/create-order", authMiddleware, createOrderController);
router.post("/verify-payment", authMiddleware, verifyPaymentController);
router.get("/bookings",authMiddleware,getAllOrder);



export default router;