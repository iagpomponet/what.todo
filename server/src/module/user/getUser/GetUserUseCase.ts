import { getUser } from "../../../database/db.ts";

interface Args {
  id?: string;
  email?: string;
}

export default class GetUserUseCase {
  async execute({ id, email }: Args) {
    try {
      const results = await getUser(id, email);

      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}
