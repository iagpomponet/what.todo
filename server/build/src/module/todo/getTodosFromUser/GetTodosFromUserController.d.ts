import { Request, Response } from "express";
export default class GetTodosFromUserController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
