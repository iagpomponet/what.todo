import { User } from "../../../../database/types";
import { updateUser } from "../../../../database/db.js";

type Args = Partial<User>;

export default class UpdateUserUseCase {
  async execute({ first_name, last_name, avatar_url, user_id }: Args) {
    const data = {
      first_name,
      last_name,
      avatar_url,
    };

    try {
      const result = await updateUser(user_id, data);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
