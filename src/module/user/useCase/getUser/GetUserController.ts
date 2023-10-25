import { Request, Response } from "express";
import GetUserUseCase from "./getUserUseCase.ts";

export default class GetUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req?.body;

    if (!user_id) {
      return res.status(404).json({
        error: "User id not provided",
      });
    }

    const getUserUseCase = new GetUserUseCase();

    try {
      const result = await getUserUseCase.execute({ id: user_id });

      if (!result?.length) {
        return res.status(404).json({
          error: "User not found",
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
