import { NextFunction, Request, Response } from "express"
import { UserResult } from "../interfaces/users.interface"
import { client } from "../database"
import AppError from "../errors/App.errors"

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const {email} = req.body

    const query: string = 'SELECT * FROM "users" WHERE "email" = $1;'
    const queryResult: UserResult = await client.query(query, [email])

    if(queryResult.rowCount) {
        throw new AppError('Email already registered', 409)
    }

    return next()
}