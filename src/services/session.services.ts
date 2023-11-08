import { sign } from "jsonwebtoken";
import { client } from "../database";
import AppError from "../errors/App.errors";
import { SessionCreate, SessionReturn } from "../interfaces/session.interface";
import { User, UserResult } from "../interfaces/users.interface";
import { compare } from "bcryptjs";

export const loginService = async (data: SessionCreate): Promise<SessionReturn> =>{
    const query: UserResult = await client.query(
        'SELECT * FROM "users" WHERE "email" = $1;',
        [data.email]
    )

    if(query.rowCount === 0){
        throw new AppError('Wrong email/password', 401)
    }

    const user: User = query.rows[0]

    const verifyPass: boolean = await compare(data.password, user.password)

    if(!verifyPass){
        throw new AppError('Wrong email/password', 401)
    }

    const token: string = sign(
        { name: user.name, admin: user.admin },
        process.env.SECRET_KEY!,
        { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    )

    return {token}
}