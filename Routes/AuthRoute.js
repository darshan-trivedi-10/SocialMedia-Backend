import express from "express";
import cors from 'cors'
import { createUser, LoginUser } from '../Controllers/AuthController.js'
const AuthRoute = express.Router();


AuthRoute.post('/register', cors(), createUser) 
AuthRoute.post('/login', cors(), LoginUser)

export default AuthRoute;