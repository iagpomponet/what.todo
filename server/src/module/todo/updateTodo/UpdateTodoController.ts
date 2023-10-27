import { Request, Response } from "express";
import UpdateTodoUseCase from "./UpdateTodoUseCase.ts";

export default class UpdateTodoController {
  async handle(req: Request, res: Response) {
    const { todo_id, content, labels, completed } = req.body;
    const updateTodoUseCase = new UpdateTodoUseCase();

    if (!todo_id) {
      return res.status(400).json({
        error: "No todo id provided",
      });
    }

    try {
      const result = await updateTodoUseCase.execute({
        content,
        labels,
        completed,
        todo_id,
      });

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
