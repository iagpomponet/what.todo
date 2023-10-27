import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import GetUserUseCase from "../module/user/getUser/GetUserUseCase.ts";

export default async function handleAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { whatTodoAuthCookie } = req.cookies;

  if (!whatTodoAuthCookie) {
    return res.status(500).json({ error: "No authentication token provided" });
  }

  try {
    const { sub: user_id } = jwt.verify(
      whatTodoAuthCookie,
      process.env.JWT_SECRET
    );

    if (!user_id) {
      return res.status(400).json({ error: "Invalid authentication token" });
    }

    const getUserUseCase = new GetUserUseCase();
    const user = await getUserUseCase.execute({ id: user_id as string });

    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  console.log("whatTodoAuthCookie :>> ", whatTodoAuthCookie);
}
