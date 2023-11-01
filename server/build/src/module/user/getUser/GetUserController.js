var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GetUserUseCase from "./GetUserUseCase";
export default class GetUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, email } = req === null || req === void 0 ? void 0 : req.body;
            if (!user_id && !email) {
                return res.status(404).json({
                    error: "User id or e-mail not provided",
                });
            }
            const getUserUseCase = new GetUserUseCase();
            try {
                const result = yield getUserUseCase.execute({ id: user_id, email });
                if (!(result === null || result === void 0 ? void 0 : result.length)) {
                    return res.status(404).json({
                        error: "User not found",
                    });
                }
                return res.status(200).json({
                    data: result,
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
//# sourceMappingURL=GetUserController.js.map