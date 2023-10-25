import { getUser } from "../../../../database/db.js";

interface Args {
  id: string;
}

export default class GetUserUseCase {
  async execute({ id }: Args) {
    try {
      const results = await getUser(id);

      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}
