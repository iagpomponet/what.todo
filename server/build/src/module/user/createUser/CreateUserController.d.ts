import { Request, Response } from "express";
export default class CreateUserController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
