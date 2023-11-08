import { NextFunction, Request, Response } from "express"
import AppError from "../errors/App.errors"

export const verifyPermission = (req: Request, res: Response, next: NextFunction): void =>{
    const { admin } = res.locals.decoded;

    if (admin === true) {
        return next();
    } else {
        throw new AppError("Insufficient permission", 403);
    }    
}