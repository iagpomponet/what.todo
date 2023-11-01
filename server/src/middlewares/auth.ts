import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import GetUserUseCase from "../module/user/getUser/GetUserUseCase";

export default async function handleAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { whatTodoAuthCookie } = req.cookies;

  if (!whatTodoAuthCookie) {
    return res.status(401).json({ error: "No authentication token provided" });
  }

  try {
    const { sub: user_id } = jwt.verify(
      whatTodoAuthCookie,
      process.env.JWT_SECRET
    );

    if (!user_id) {
      throw new Error("Invalid authentication token");
    }

    const getUserUseCase = new GetUserUseCase();
    const user = await getUserUseCase.execute({ id: user_id as string });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = {
      id: user_id as string,
    };

    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}
