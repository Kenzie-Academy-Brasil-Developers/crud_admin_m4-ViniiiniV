import { NextFunction, Request, Response } from "express"
import { UserResult } from "../interfaces/users.interface"
import { client } from "../database"
import AppError from "../errors/App.errors"

export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const {userId} = req.params

    const query: string = 'SELECT * FROM "users" WHERE "id" = $1;'
    const queryResult: UserResult = await client.query(query, [userId])

    if(!queryResult.rowCount) {
        throw new AppError('User/course not found', 404)
    }

    return next()
}