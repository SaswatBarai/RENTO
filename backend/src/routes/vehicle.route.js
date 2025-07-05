import {Router} from "express"
import {adminMiddleware,authMiddleware,optionalAuthMiddleware} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import {
    addVehicleController,
    removeVehicleController,
    getVehicleController,
    getAllVehicleController
} from "../controllers/vehicle.controller.js"


const router = Router();

// Define your vehicle routes here
router.post("/addVehicle", authMiddleware, adminMiddleware,
    upload.fields([
       {
        name: "vehicleImage",
        maxCount: 1
       }
    ]),
    addVehicleController
);

router.delete("/remove/:vehicleId", authMiddleware, adminMiddleware, removeVehicleController);
router.get("/getVehicle/:vehicleId", optionalAuthMiddleware, getVehicleController);
router.get("/getAllVehicles", getAllVehicleController);

export default router;