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
import pkg from "bcryptjs";
import GetUserUseCase from "../getUser/GetUserUseCase";
export default class AuthenticateUserUseCase {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_SECRET;
            const getUserUseCase = new GetUserUseCase();
            if (!secret) {
                throw new Error("No JWT secret found");
            }
            try {
                const userQueryResult = yield getUserUseCase.execute({ email });
                if (!userQueryResult.length) {
                    throw new Error("No user found with this e-mail");
                }
                const [user] = userQueryResult;
                const token = jwt.sign({}, secret, {
                    expiresIn: "1d",
                    subject: user.user_id,
                });
                const passwordCorrect = yield pkg.compare(password, user.password);
                if (passwordCorrect) {
                    return { user, token };
                }
                else {
                    throw new Error("Incorrect e-mail or password");
                }
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
//# sourceMappingURL=AuthenticateUserUseCase.js.map