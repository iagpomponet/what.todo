import { deleteUser } from "../../../../database/db.js";

interface Args {
  id: string;
}

export default class DeleteUserUserCase {
  async execute({ id }: Args) {
    try {
      const result = await deleteUser(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
