import { deleteUser } from "../../../database/db.ts";

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
