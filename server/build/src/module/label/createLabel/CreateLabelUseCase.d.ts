interface Args {
    name: string;
    color: string;
    user_id: string;
}
export default class CreateLabelUseCase {
    execute({ name, color, user_id }: Args): Promise<any>;
}
export {};
