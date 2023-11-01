import { Label } from "../../../database/types";
interface Args {
    todo_id: string;
    content: string;
    completed: boolean;
    labels: Label[];
}
export default class UpdateTodoUseCase {
    execute({ content, completed, labels, todo_id }: Args): Promise<any>;
}
export {};
