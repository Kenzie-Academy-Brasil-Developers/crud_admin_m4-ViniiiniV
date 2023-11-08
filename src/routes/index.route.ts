import { Router } from "express";
import { usersRoutes } from "./users.router";
import { loginRoute } from "./session.router";
import { coursesRoutes } from "./courses.router";

export const routes: Router = Router()

routes.use('/users', usersRoutes)
routes.use('/login', loginRoute)
routes.use('/courses', coursesRoutes)