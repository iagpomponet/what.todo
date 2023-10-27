import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connect } from "./database/db.ts";

import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.ts";
import labelRoutes from "./routes/label.routes.ts";

const app = express();
import dotenv from "dotenv";

dotenv.config();

connect();

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.use("/label", labelRoutes);

app.listen(3001, async () => {});