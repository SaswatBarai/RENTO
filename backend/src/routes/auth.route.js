import {Router} from 'express';
import {
    getNewAccessToken,
    loginController, 
    logoutController, 
    registerController,
    googleController,
    getLocationController,
    setLocationController

} from "../controllers/auth.controller.js";
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema,loginSchema } from '../validators/auth.schema.js';
import { authMiddleware,optionalAuthMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

router.post("/register",validate(registerSchema),registerController);
router.post("/login",validate(loginSchema),loginController); 
router.get("/logout",authMiddleware,logoutController);
router.get("/refresh",getNewAccessToken);
router.post("/google",googleController);
router.patch("/setLocation",optionalAuthMiddleware,setLocationController);
router.get("/getLocation",optionalAuthMiddleware,getLocationController);

export default router;
