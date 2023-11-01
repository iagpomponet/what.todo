interface Args {
    id: string;
}
export default class DeleteTodoUseCase {
    execute({ id }: Args): Promise<any>;
}
export {};
