import format from "pg-format";
import { Course, CourseCreate, CourseRead, CourseResult } from "../interfaces/courses.interface";
import { client } from "../database";
import { courseReadSchema } from "../schemas/courses.schema";
import AppError from "../errors/App.errors";

export const courseCreateService = async (data: CourseCreate): Promise<Course> =>{
    const queryFormat: string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(data),
        Object.values(data)
    )

    const query: CourseResult = await client.query(queryFormat)
    return query.rows[0]
}

export const getAllCoursesService = async (): Promise<CourseRead> => {
    const query: CourseResult = await client.query('SELECT * FROM "courses";')
    return courseReadSchema.parse(query.rows)
};

export const addUserCourseService = async (courseId: string, userId: string): Promise<void> =>{
    const queryString: string = `
    INSERT INTO "userCourses" ("userId", "courseId") VALUES ($1, $2);
    `

    await client.query(queryString, [userId, courseId])
}

export const getUsersCourseService = async (id: string) =>{
    const queryString: string = `
    SELECT 
      "u"."id" AS "userId",
      "u"."name" AS "userName",
      "c"."id" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
      "uc"."active" AS "userActiveInCourse"
    FROM "courses" AS "c" 
    JOIN "userCourses" AS "uc" 
      ON "c"."id" = "uc"."courseId" 
    JOIN "users" AS "u"
      ON "u"."id" = "uc"."userId" 
    WHERE "c"."id" = $1;
    `
    const query: CourseResult = await client.query(queryString, [id])

    if(!query.rowCount){
        throw new AppError('No users found in this course', 404)
    }

    return query.rows
}

export const deleteUserCourseService = async (courseId: string, userId: string): Promise<void> =>{
    const queryString: string = `
    UPDATE "userCourses" SET "active" = false WHERE "courseId" = $1 AND "userId" = $2;
    `

    await client.query(queryString, [courseId, userId])
}