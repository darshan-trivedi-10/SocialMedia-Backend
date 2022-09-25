import express from "express";
import { createUser, LoginUser } from '../Controllers/AuthController.js'
const AuthRoute = express.Router();


AuthRoute.post('/register', createUser)
AuthRoute.post('/login', LoginUser)

export default AuthRoute;