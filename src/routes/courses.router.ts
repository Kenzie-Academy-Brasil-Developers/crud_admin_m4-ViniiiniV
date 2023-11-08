import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermissions.middleware";
import { addUserCourseController, courseCreateController, deleteUserCourseController, getAllCoursesController, getUsersCourseController } from "../controllers/course.controller";
import { verifyCourse } from "../middlewares/verifyCourse.middleware";
import { verifyUser } from "../middlewares/verifyUser.middleware";

export const coursesRoutes: Router = Router()

coursesRoutes.post('/', verifyToken, verifyPermission, validateBody(courseCreateSchema), courseCreateController)
coursesRoutes.get('/', getAllCoursesController)

coursesRoutes.use('/:courseId/users/:userId', verifyToken, verifyPermission,verifyCourse, verifyUser)

coursesRoutes.post('/:courseId/users/:userId', addUserCourseController)
coursesRoutes.delete('/:courseId/users/:userId', deleteUserCourseController)

coursesRoutes.get('/:id/users', verifyToken, verifyPermission, getUsersCourseController)