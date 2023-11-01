var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CreateTodoUseCase from "./CreateTodoUseCase";
export default class CreateTodoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, labels, user_id } = req.body;
            const createTodoUseCase = new CreateTodoUseCase();
            try {
                const result = yield createTodoUseCase.execute({
                    content,
                    labels,
                    user_id,
                });
                return res.status(200).json({ data: result });
            }
            catch (error) {
                return res.status(400).json({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
//# sourceMappingURL=CreateTodoController.js.map