import * as controller from "../controllers";
import express from "express";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

//private routes
// router.use(verifyToken);
router.get("/get", controller.getWork);
router.post("/add", controller.createNewWork);
router.put("/update", controller.updateWork);
router.delete("/delete/:id", controller.deleteWork);
export default router;
