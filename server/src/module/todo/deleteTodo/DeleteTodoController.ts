import { Request, Response } from "express";
import DeleteTodoUseCase from "./DeleteTodoUseCase.ts";

export default class DeleteTodoController {
  async handle(req: Request, res: Response) {
    const { todo_id } = req.body;
    const deleteTodoUseCase = new DeleteTodoUseCase();

    if (!todo_id) {
      return res.status(400).json({
        error: "No todo id provided",
      });
    }

    try {
      const result = await deleteTodoUseCase.execute({ id: todo_id });

      console.log("result :>> ", result);

      if (!result.length) {
        return res.status(404).json({
          error: "No entry found",
        });
      }

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
