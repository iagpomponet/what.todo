import { Request, Response } from "express";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  async handle(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    try {
      const resu = await createUserUseCase.execute({
        first_name,
        last_name,
        email,
        password,
        avatar_url: "https://picsum.photos/200/300",
      });

      return res.status(201).json({
        data: resu.rows[0],
      });
    } catch (error) {
      return res.status(400)?.json({
        error: (error as Error).message,
      });
    }
  }
}
