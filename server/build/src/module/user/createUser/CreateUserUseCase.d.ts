interface Args {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar_url: string;
}
export default class CreateUserUseCase {
    execute({ first_name, last_name, email, password, avatar_url }: Args): Promise<any>;
}
export {};
