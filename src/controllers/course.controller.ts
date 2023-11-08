import { Request, Response } from "express";
import { Course, CourseRead } from "../interfaces/courses.interface";
import { addUserCourseService, courseCreateService, deleteUserCourseService, getAllCoursesService, getUsersCourseService } from "../services/course.services";

export const courseCreateController = async (req: Request, res: Response): Promise<Response> =>{
    const course: Course = await courseCreateService(req.body)
    return res.status(201).json(course)
}

export const getAllCoursesController = async (req: Request, res: Response): Promise<Response> => {
    const course: CourseRead = await getAllCoursesService()
    return res.status(200).json(course)
}

export const addUserCourseController = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params
    await addUserCourseService(courseId, userId)
    return res.status(201).json({ message: "User successfully vinculed to course" })
}

export const getUsersCourseController = async (req: Request, res: Response): Promise<Response> => {
    const usersCourse = await getUsersCourseService(req.params.id)
    return res.status(200).json(usersCourse)
};

export const deleteUserCourseController = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params
    await deleteUserCourseService(courseId, userId)
    return res.sendStatus(204)
};