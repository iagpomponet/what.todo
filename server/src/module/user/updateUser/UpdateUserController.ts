import { Request, Response } from "express";
import UpdateUserUseCase from "./UpdateUserUseCase";
import GetUserUseCase from "../getUser/GetUserUseCase";

export default class UpdateUserController {
  async handle(req: Request, res: Response) {
    const getUserUseCase = new GetUserUseCase();
    const { first_name, last_name, avatar_url, user_id } = req?.body;
    const updateUserUseCase = new UpdateUserUseCase();

    try {
      const getUserResult = await getUserUseCase.execute({ id: user_id });

      if (!getUserResult?.length) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const result = await updateUserUseCase.execute({
        first_name,
        last_name,
        user_id,
        avatar_url,
      });

      return res.json({
        data: result.rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
