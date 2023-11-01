var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CreateUserUseCase from "./CreateUserUseCase";
export default class CreateUserController {
    handle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, email, password } = req.body;
            const createUserUseCase = new CreateUserUseCase();
            try {
                const resu = yield createUserUseCase.execute({
                    first_name,
                    last_name,
                    email,
                    password,
                    avatar_url: "https://picsum.photos/200/300",
                });
                return res.status(201).json({
                    data: resu.rows[0],
                });
            }
            catch (error) {
                return (_a = res.status(400)) === null || _a === void 0 ? void 0 : _a.json({
                    error: error.message,
                });
            }
        });
    }
}
//# sourceMappingURL=CreateUserController.js.map