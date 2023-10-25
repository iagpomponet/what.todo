import bcrypt from "bcryptjs";
import { createUser } from "../../../../database/db.js";

interface Args {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar_url: string;
}

export default class CreateUserUseCase {
  async execute({ first_name, last_name, email, password, avatar_url }: Args) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      avatar_url,
    };

    try {
      const results = await createUser(user);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}
