var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UpdateUserUseCase from "./UpdateUserUseCase";
import GetUserUseCase from "../getUser/GetUserUseCase";
export default class UpdateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserUseCase = new GetUserUseCase();
            const { first_name, last_name, avatar_url, user_id } = req === null || req === void 0 ? void 0 : req.body;
            const updateUserUseCase = new UpdateUserUseCase();
            try {
                const getUserResult = yield getUserUseCase.execute({ id: user_id });
                if (!(getUserResult === null || getUserResult === void 0 ? void 0 : getUserResult.length)) {
                    return res.status(404).json({
                        error: "User not found",
                    });
                }
                const result = yield updateUserUseCase.execute({
                    first_name,
                    last_name,
                    user_id,
                    avatar_url,
                });
                return res.json({
                    data: result.rows[0],
                });
            }
            catch (error) {
                return res.status(400).json({
                    error: error.message,
                });
            }
        });
    }
}
//# sourceMappingURL=UpdateUserController.js.map