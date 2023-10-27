import { Request, Response } from "express";
import GetTodoFromUserUseCase from "./GetTodosFromUserUseCase.ts";

export default class GetTodosFromUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.params;

    try {
      const getTodoFromUserUseCase = new GetTodoFromUserUseCase();
      const result = await getTodoFromUserUseCase.execute({ user_id });

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
