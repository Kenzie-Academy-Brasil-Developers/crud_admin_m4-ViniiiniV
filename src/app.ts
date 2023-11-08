import 'express-async-errors'
import express, { Application, json } from 'express'
import { routes } from './routes/index.route'
import { handleError } from './middlewares/handleError.middleware'

const app: Application = express()

app.use(json())

app.use('/', routes)

app.use(handleError)

export default app
