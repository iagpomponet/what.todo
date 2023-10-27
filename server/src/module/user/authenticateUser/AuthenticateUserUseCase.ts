import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import GetUserUseCase from "../getUser/GetUserUseCase.ts";

interface Args {
  password: string;
}

export default class AuthenticateUserUseCase {
  async execute({ email, password }) {
    const secret = process.env.JWT_SECRET;
    const getUserUseCase = new GetUserUseCase();

    if (!secret) {
      throw new Error("No JWT secret found");
    }

    try {
      const userQueryResult = await getUserUseCase.execute({ email });

      if (!userQueryResult.length) {
        throw new Error("No user found with this e-mail");
      }

      const [user] = userQueryResult;

      const token = jwt.sign({}, secret, {
        expiresIn: "1d",
        subject: user.user_id,
      });

      debugger;

      const passwordCorrect = await pkg.compare(password, user.password);

      if (passwordCorrect) {
        return { user, token };
      } else {
        throw new Error("Incorrect e-mail or password");
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
