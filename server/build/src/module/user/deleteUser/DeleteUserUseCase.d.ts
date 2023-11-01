interface Args {
    id: string;
}
export default class DeleteUserUserCase {
    execute({ id }: Args): Promise<any>;
}
export {};
