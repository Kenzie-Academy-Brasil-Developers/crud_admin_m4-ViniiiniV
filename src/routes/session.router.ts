import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schemas/session.schema";
import { loginController } from "../controllers/session.controller";

export const loginRoute: Router = Router()

loginRoute.post('/', validateBody(sessionSchema), loginController)