import * as controller from "../controllers";
import express from "express";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

// router.use(verifyToken);
//Public routes
router.get("/get", controller.getComment);
router.post("/", controller.createNewComment);
//private routes
export default router;
