import { Request, Response } from "express";
export default class DeleteUserController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
