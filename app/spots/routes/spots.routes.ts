import { Router } from "express";
import { SpotController } from "../controllers/spot.controller";

const router = Router();

router.get("/api/spots", SpotController.list);
router.get("/api/spots/:id", SpotController.getById);
router.post("/api/spots", SpotController.create);
router.post("/api/spots/:id/tips", SpotController.addTip);
router.post("/api/spots/save", SpotController.toggleSaved);

export default router;
