import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connect, selectUsers } from "./database/db.ts";

import userRoutes from "./routes/user.routes.js";

const app = express();
import dotenv from "dotenv";

dotenv.config();

connect();

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use("/user", userRoutes);

app.listen(3001, async () => {});
