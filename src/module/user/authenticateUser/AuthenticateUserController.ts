import { Request, Response } from "express";
import { CookieOptions } from "express";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase.ts";

export const authCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export default class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req?.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please provide a valid e-mail and password",
      });
    }

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    try {
      const { user, token } = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return res
        .cookie("whatTodoAuthCookie", token, authCookieConfig)
        .status(200)
        .json({
          data: user,
        });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    // check password
  }
}
