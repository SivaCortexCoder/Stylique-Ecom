import express from 'express'
import { isAdmin, registerUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)

userRouter.get('/is-admin/:uid',isAdmin)

export default userRouter