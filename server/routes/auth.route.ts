import { Router } from "express";
import { AuthController } from "../controllers/authController";

const routes = Router();

routes.post("/auth/login", AuthController.login);
routes.post("/auth/refresh", AuthController.refreshToken);
routes.post("/auth/operator", AuthController.getOperator);
routes.delete("/auth/logout", AuthController.logout);

export default routes;
