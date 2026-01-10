import { Router } from "express";
import loginController from "../controllers/login.controller";

const loginRoutes = Router();

loginRoutes.get("/", loginController);

export default loginRoutes;
