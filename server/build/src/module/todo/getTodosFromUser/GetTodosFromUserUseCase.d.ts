interface Args {
    user_id: string;
}
export default class GetTodoFromUserUseCase {
    execute({ user_id }: Args): Promise<any>;
}
export {};
