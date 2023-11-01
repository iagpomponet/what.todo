import { Request, Response, NextFunction } from "express";
export default function handleAuth(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
