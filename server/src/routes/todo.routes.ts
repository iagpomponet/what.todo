import express from "express";
import handleAuth from "../middlewares/auth";
import CreateTodoController from "../module/todo/createTodo/CreateTodoController";
import UpdateTodoController from "../module/todo/updateTodo/UpdateTodoController";
import DeleteTodoController from "../module/todo/deleteTodo/DeleteTodoController";
import GetTodosFromUserController from "../module/todo/getTodosFromUser/GetTodosFromUserController";

const createTodoController = new CreateTodoController();
const updateTodoController = new UpdateTodoController();
const deleteTodoController = new DeleteTodoController();

const getTodosFromUserController = new GetTodosFromUserController();

const router = express.Router();

// Create todo
router.post("/", handleAuth, createTodoController.handle);

//Update todo
router.put("/:todo_id", handleAuth, updateTodoController.handle);

// Delete Todo
router.delete("/:todo_id", handleAuth, deleteTodoController.handle);

// Get all todos from a user

router.get("/user/:user_id", handleAuth, getTodosFromUserController.handle);

export default router;
