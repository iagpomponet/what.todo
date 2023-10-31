import { Request, Response } from "express";
import GetUserUseCase from "../getUser/GetUserUseCase.ts";

export default class BootstrapController {
  async handle(req: Request, res: Response) {
    const { user } = req;
    const getUserUseCase = new GetUserUseCase();

    try {
      const result = await getUserUseCase.execute({ id: user.id });

      return res.status(200).json({
        data: result[0],
      });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(401).json({
        error: error.message,
      });
    }
  }
}
