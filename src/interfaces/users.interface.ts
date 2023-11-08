import { userReadSchema, userReturnSchema } from './../schemas/users.schema';
import { z } from 'zod';
import { userCreateSchema, userSchema } from '../schemas/users.schema';
import { QueryResult } from 'pg';

export type User = z.infer<typeof userSchema>

export type UserCreate = z.infer<typeof userCreateSchema>
export type UserRead = z.infer<typeof userReadSchema>
export type UserReturn = z.infer<typeof userReturnSchema>


export type UserResult = QueryResult<User>