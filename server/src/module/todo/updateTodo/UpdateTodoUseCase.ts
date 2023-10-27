import { updateTodo } from "../../../database/db.ts";
import { Label } from "../../../database/types.ts";

interface Args {
  todo_id: string;
  content: string;
  completed: boolean;
  labels: Label[];
}

export default class UpdateTodoUseCase {
  async execute({ content, completed, labels, todo_id }: Args) {
    try {
      const result = await updateTodo(todo_id, { content, completed, labels });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
