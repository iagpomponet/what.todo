import { Request, Response } from "express";
import CreateLabelUseCase from "./CreateLabelUseCase";

export default class CreateLabelController {
  async handle(req: Request, res: Response) {
    const { name, color, user_id } = req.body;
    const createTodoUseCase = new CreateLabelUseCase();

    try {
      const result = await createTodoUseCase.execute({
        name,
        color,
        user_id,
      });

      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}
