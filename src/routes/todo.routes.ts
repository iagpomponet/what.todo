import express from "express";
import handleAuth from "../middlewares/auth.ts";
import CreateTodoController from "../module/todo/createTodo/CreateTodoController.ts";
import UpdateTodoController from "../module/todo/updateTodo/UpdateTodoController.ts";
import DeleteTodoController from "../module/todo/deleteTodo/DeleteTodoController.ts";

const createTodoController = new CreateTodoController();
const updateTodoController = new UpdateTodoController();
const deleteTodoController = new DeleteTodoController();

const router = express.Router();

// Create todo
router.post("/", handleAuth, createTodoController.handle);

//Update todo
router.put("/", handleAuth, updateTodoController.handle);

// Delete Todo
router.delete("/", deleteTodoController.handle);

export default router;
