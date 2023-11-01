import { deleteTodo } from "../../../database/db";

interface Args {
  id: string;
}

export default class DeleteTodoUseCase {
  async execute({ id }: Args) {
    try {
      const result = await deleteTodo(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
