import { User } from "../../../database/types";
type Args = Partial<User>;
export default class UpdateUserUseCase {
    execute({ first_name, last_name, avatar_url, user_id }: Args): Promise<any>;
}
export {};
