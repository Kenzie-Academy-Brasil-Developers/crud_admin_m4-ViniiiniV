import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { createUserController, getAllUserController, getCoursesUserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyPermission } from "../middlewares/verifyPermissions.middleware";

export const usersRoutes: Router = Router()

usersRoutes.post('/', validateBody(userCreateSchema), verifyEmail, createUserController)
usersRoutes.get('/', verifyToken, verifyPermission, getAllUserController)
usersRoutes.get('/:id/courses', verifyToken, verifyPermission, getCoursesUserController)