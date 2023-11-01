var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DeleteUserUserCase from "./DeleteUserUseCase";
import GetUserUseCase from "../getUser/GetUserUseCase";
export default class DeleteUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserUseCase = new GetUserUseCase();
            const deleteUserUseCase = new DeleteUserUserCase();
            const { user_id } = req.body;
            try {
                const getUserResult = yield getUserUseCase.execute({ id: user_id });
                if (!(getUserResult === null || getUserResult === void 0 ? void 0 : getUserResult.length)) {
                    return res.status(404).json({
                        error: "User not found",
                    });
                }
                yield deleteUserUseCase.execute({ id: user_id });
                return res.status(204).json({
                    data: "User Deleted!",
                });
            }
            catch (error) {
                console.log("error :>> ", error);
                return res.status(400).json({
                    error: error.message,
                });
            }
        });
    }
}
//# sourceMappingURL=DeleteUserController.js.map