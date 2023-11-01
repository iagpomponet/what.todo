var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DeleteTodoUseCase from "./DeleteTodoUseCase";
export default class DeleteTodoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { todo_id } = req.params;
            const deleteTodoUseCase = new DeleteTodoUseCase();
            if (!todo_id) {
                return res.status(400).json({
                    error: "No todo id provided",
                });
            }
            try {
                const result = yield deleteTodoUseCase.execute({ id: todo_id });
                console.log("result :>> ", result);
                if (!result.length) {
                    return res.status(404).json({
                        error: "No entry found",
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
//# sourceMappingURL=DeleteTodoController.js.map