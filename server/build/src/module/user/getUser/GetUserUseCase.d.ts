interface Args {
    id?: string;
    email?: string;
}
export default class GetUserUseCase {
    execute({ id, email }: Args): Promise<any>;
}
export {};
