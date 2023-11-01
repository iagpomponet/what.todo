import { Request, Response } from "express";
import { CookieOptions } from "express";
export declare const authCookieConfig: CookieOptions;
export default class AuthenticateUserController {
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
