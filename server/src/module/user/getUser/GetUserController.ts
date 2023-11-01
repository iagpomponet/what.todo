import { Request, Response } from "express";
import GetUserUseCase from "./GetUserUseCase";

export default class GetUserController {
  async handle(req: Request, res: Response) {
    const { user_id, email } = req?.body;

    if (!user_id && !email) {
      return res.status(404).json({
        error: "User id or e-mail not provided",
      });
    }

    const getUserUseCase = new GetUserUseCase();

    try {
      const result = await getUserUseCase.execute({ id: user_id, email });

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
