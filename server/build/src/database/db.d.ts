export declare function connect(): Promise<any>;
export declare function selectUsers(): Promise<any>;
export declare function getUser(id?: string, email?: string): Promise<any>;
export declare function createUser(user: any): Promise<any>;
export declare function updateUser(id: any, data: any): Promise<any>;
export declare function deleteUser(id: any): Promise<any>;
export declare function createTodo({ user_id, labels, content }: any): Promise<any>;
export declare function updateTodo(id: any, data: any): Promise<any>;
export declare function deleteTodo(id: any): Promise<any>;
export declare function getTodoFromUser(user_id: string): Promise<any>;
export declare function createLabel({ user_id, color, name, }: {
    user_id: string;
    color: string;
    name: string;
}): Promise<any>;
