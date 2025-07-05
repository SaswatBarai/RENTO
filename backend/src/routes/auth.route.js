import {Router} from 'express';
import {getNewAccessToken, loginController, logoutController, registerController,googleController} from "../controllers/auth.controller.js";
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema,loginSchema } from '../validators/auth.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

router.post("/register",validate(registerSchema),registerController);
router.post("/login",validate(loginSchema),loginController); 
router.get("/logout",authMiddleware,logoutController);
router.get("/getNewAccessToken/:refreshToken",authMiddleware,getNewAccessToken);
router.post("/google",googleController);

export default router;
