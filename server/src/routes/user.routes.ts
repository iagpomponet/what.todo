import express from "express";

import handleAuth from "../middlewares/auth.ts";

import CreateUserController from "../module/user/createUser/CreateUserController.ts";
import UpdateUserController from "../module/user/updateUser/UpdateUserController.ts";
import DeleteUserController from "../module/user/deleteUser/DeleteUserController.ts";
import GetUserController from "../module/user/getUser/GetUserController.ts";
import AuthenticateUserController from "../module/user/authenticateUser/AuthenticateUserController.ts";
import BootstrapController from "../module/user/bootstrap/BootstrapController.ts";

const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const authenticateUserController = new AuthenticateUserController();
const bootstrapController = new BootstrapController();

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

// Bootstrap

router.get("/bootstrap", handleAuth, bootstrapController.handle);

export default router;
