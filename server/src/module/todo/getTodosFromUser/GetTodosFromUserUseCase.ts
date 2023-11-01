import { getTodoFromUser } from "../../../database/db";

interface Args {
  user_id: string;
}

export default class GetTodoFromUserUseCase {
  async execute({ user_id }: Args) {
    try {
      const result = await getTodoFromUser(user_id);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
