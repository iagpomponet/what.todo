import express from "express";
import handleAuth from "../middlewares/auth.ts";
import CreateTodoController from "../module/todo/createTodo/CreateTodoController.ts";
import CreateLabelController from "../module/label/createLabel/CreateLabelController.ts";

const router = express.Router();

const createLabelController = new CreateLabelController();

// Create label
router.post("/", handleAuth, createLabelController.handle);

export default router;
