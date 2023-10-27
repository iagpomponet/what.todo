import { Request, Response } from "express";
import CreateTodoUseCase from "./CreateTodoUseCase.ts";

export default class CreateTodoController {
  async handle(req: Request, res: Response) {
    const { content, labels, user_id } = req.body;
    const createTodoUseCase = new CreateTodoUseCase();

    try {
      const result = await createTodoUseCase.execute({
        content,
        labels,
        user_id,
      });

      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}
