import express from "express";

import CreateUserController from "../module/user/useCase/createUser/createUserController.js";
import { UpdateUserController } from "../module/user/useCase/updateUser/updateUserController.js";
import DeleteUserController from "../module/user/useCase/deleteUser/deleteUserController.js";
import GetUserController from "../module/user/useCase/getUser/getUserController.js";

const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const router = express.Router();

// Get single user
router.get("/", getUserController.handle);

// Create new user
router.post("/", createUserController.handle);

// Update User
router.put("/", updateUserController.handle);

// Delete User
router.delete("/", deleteUserController.handle);

export default router;
