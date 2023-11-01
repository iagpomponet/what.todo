var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";
export const authCookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};
export default class AuthenticateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req === null || req === void 0 ? void 0 : req.body;
            if (!email || !password) {
                return res.status(400).json({
                    error: "Please provide a valid e-mail and password",
                });
            }
            const authenticateUserUseCase = new AuthenticateUserUseCase();
            try {
                const { user, token } = yield authenticateUserUseCase.execute({
                    email,
                    password,
                });
                return res
                    .cookie("whatTodoAuthCookie", token, authCookieConfig)
                    .status(200)
                    .json({
                    data: user,
                });
            }
            catch (error) {
                return res.status(400).json({
                    error: error.message,
                });
            }
            // check password
        });
    }
}
//# sourceMappingURL=AuthenticateUserController.js.map