import express from "express";
import handleAuth from "../middlewares/auth";
import CreateTodoController from "../module/todo/createTodo/CreateTodoController";
import CreateLabelController from "../module/label/createLabel/CreateLabelController";

const router = express.Router();

const createLabelController = new CreateLabelController();

// Create label
router.post("/", handleAuth, createLabelController.handle);

export default router;
