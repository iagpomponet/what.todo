import { createLabel } from "../../../database/db.ts";

interface Args {
  name: string;
  color: string;
  user_id: string;
}

export default class CreateLabelUseCase {
  async execute({ name, color, user_id }: Args) {
    try {
      const result = createLabel({ user_id, name, color });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
