var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./database/db";
import userRoutes from "./routes/user.routes.js";
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
app.listen(3001, () => __awaiter(void 0, void 0, void 0, function* () { }));
//# sourceMappingURL=index.js.map