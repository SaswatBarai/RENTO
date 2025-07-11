import {Router} from "express";
import {createOrderController,verifyPaymentController} from "../controllers/order.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";


const router = Router();
router.post("/create-order", authMiddleware, createOrderController);
router.post("/verify-payment", authMiddleware, verifyPaymentController);

export default router;