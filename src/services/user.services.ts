import { userReadSchema } from './../schemas/users.schema';
import format from "pg-format";
import { UserCreate, UserRead, UserResult, UserReturn } from "../interfaces/users.interface";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userReturnSchema } from "../schemas/users.schema";
import AppError from '../errors/App.errors';

export const createUserService = async (data: UserCreate): Promise<UserReturn> => {
    data.password = await hash(data.password, 10)

    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(data),
        Object.values(data)
    );

    const query: UserResult = await client.query(queryFormat)
    return userReturnSchema.parse(query.rows[0])
}

export const getAllUserService = async (): Promise<UserRead> => {
    const query: UserResult = await client.query('SELECT * FROM "users";')
    return userReadSchema.parse(query.rows)
};

export const getCoursesUserService = async (id: string) =>{
    const queryString: string = `
    SELECT 
      "c"."id" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
      "uc"."active" AS "userActiveInCourse",
      "u"."id" AS "userId",
      "u"."name" AS "userName"
    FROM "courses" AS "c" 
    JOIN "userCourses" AS "uc" 
      ON "c"."id" = "uc"."courseId" 
    JOIN "users" AS "u"
      ON "u"."id" = "uc"."userId" 
    WHERE "u"."id" = $1;
    `
    const query: UserResult = await client.query(queryString, [id])

    if(!query.rowCount){
        throw new AppError('No course found', 404)
    }

    return query.rows
}