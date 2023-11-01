import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./database/db";

import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";
import labelRoutes from "./routes/label.routes";

const app = express();
import dotenv from "dotenv";

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

dotenv.config();

connect();

app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.use("/label", labelRoutes);

app.listen(3001, async () => {});
