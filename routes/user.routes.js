import { Router } from "express";
import { login, registerUser } from "../controllers/user.controller.js";
const Userrouter = Router()

Userrouter.post('/register',registerUser);
Userrouter.post('/login',login)

export default Userrouter;