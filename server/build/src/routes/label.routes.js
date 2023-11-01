import express from "express";
import handleAuth from "../middlewares/auth";
import CreateLabelController from "../module/label/createLabel/CreateLabelController";
const router = express.Router();
const createLabelController = new CreateLabelController();
// Create label
router.post("/", handleAuth, createLabelController.handle);
export default router;
//# sourceMappingURL=label.routes.js.map