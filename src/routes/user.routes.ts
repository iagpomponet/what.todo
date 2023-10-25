import express from "express";

import handleAuth from "../middlewares/auth.ts";

import CreateUserController from "../module/user/useCase/createUser/CreateUserController.ts";
import UpdateUserController from "../module/user/useCase/updateUser/UpdateUserController.ts";
import DeleteUserController from "../module/user/useCase/deleteUser/DeleteUserController.ts";
import GetUserController from "../module/user/useCase/getUser/GetUserController.ts";
import AuthenticateUserController from "../module/user/useCase/authenticateUser/AuthenticateUserController.ts";

const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const authenticateUserController = new AuthenticateUserController();

const router = express.Router();

// Get single user
router.get("/", handleAuth, getUserController.handle);

// Create new user
router.post("/", createUserController.handle);

// Update User
router.put("/", updateUserController.handle);

// Delete User
router.delete("/", deleteUserController.handle);

// Auth
router.post("/login", authenticateUserController.handle);

export default router;
