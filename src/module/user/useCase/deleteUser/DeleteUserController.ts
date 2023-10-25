import { Request, Response } from "express";
import DeleteUserUserCase from "./DeleteUserUseCase.ts";
import GetUserUseCase from "../getUser/GetUserUseCase.ts";

export default class DeleteUserController {
  async handle(req: Request, res: Response) {
    const getUserUseCase = new GetUserUseCase();
    const deleteUserUseCase = new DeleteUserUserCase();
    const { user_id } = req.body;

    try {
      const getUserResult = await getUserUseCase.execute({ id: user_id });

      if (!getUserResult?.length) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      await deleteUserUseCase.execute({ id: user_id });

      return res.status(204).json({
        data: "User Deleted!",
      });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
