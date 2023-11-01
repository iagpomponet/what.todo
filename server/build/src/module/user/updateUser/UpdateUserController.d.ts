import { Request, Response } from "express";
export default class UpdateUserController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
