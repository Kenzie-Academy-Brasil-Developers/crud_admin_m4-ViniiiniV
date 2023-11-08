import { Request, Response } from "express";
import { UserRead, UserReturn } from "../interfaces/users.interface";
import { createUserService, getAllUserService, getCoursesUserService } from "../services/user.services";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body);
    return res.status(201).json(user);
};

export const getAllUserController = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await getAllUserService();
    return res.status(200).json(users);
};

export const getCoursesUserController = async (req: Request, res: Response): Promise<Response> => {
    const courses = await getCoursesUserService(req.params.id);
    return res.status(200).json(courses);
};