import { Request, Response } from "express";
export default class UpdateTodoController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
