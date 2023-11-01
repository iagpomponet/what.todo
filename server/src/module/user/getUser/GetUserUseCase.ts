import { getUser } from "../../../database/db";

interface Args {
  id?: string;
  email?: string;
}

export default class GetUserUseCase {
  async execute({ id, email }: Args) {
    try {
      const resu = await getUser(id, email);

      return resu;
    } catch (error) {
      throw new Error(error);
    }
  }
}
