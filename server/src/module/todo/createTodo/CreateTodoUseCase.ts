import { createTodo } from "../../../database/db";

interface Args {
  content: string;
  labels: string[];
  user_id: string;
}

export default class CreateTodoUseCase {
  async execute({ content, labels, user_id }: Args) {
    console.log("labels :>> ", labels);
    try {
      const result = createTodo({ user_id, labels, content });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
