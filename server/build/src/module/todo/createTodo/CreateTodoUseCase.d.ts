interface Args {
    content: string;
    labels: string[];
    user_id: string;
}
export default class CreateTodoUseCase {
    execute({ content, labels, user_id }: Args): Promise<any>;
}
export {};
