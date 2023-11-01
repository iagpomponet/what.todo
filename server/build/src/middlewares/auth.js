var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import GetUserUseCase from "../module/user/getUser/GetUserUseCase";
export default function handleAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { whatTodoAuthCookie } = req.cookies;
        if (!whatTodoAuthCookie) {
            return res.status(401).json({ error: "No authentication token provided" });
        }
        try {
            const { sub: user_id } = jwt.verify(whatTodoAuthCookie, process.env.JWT_SECRET);
            if (!user_id) {
                throw new Error("Invalid authentication token");
            }
            const getUserUseCase = new GetUserUseCase();
            const user = yield getUserUseCase.execute({ id: user_id });
            if (!user) {
                throw new Error("User not found");
            }
            req.user = {
                id: user_id,
            };
            next();
        }
        catch (error) {
            return res.status(400).json({
                error: error.message,
            });
        }
    });
}
//# sourceMappingURL=auth.js.map