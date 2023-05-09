import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { storeValidate } from "../validators/projectValidator";
import { ProjectValidator } from "../middlewares/ProjectValidator";

const routes = Router();

routes.get("/project", ProjectController.all);
routes.get("/project/:id", ProjectController.one);
routes.get("/project/new/number", ProjectController.getNews);
routes.get("/project/view/number", ProjectController.getViews);
routes.post(
  "/project",
  storeValidate,
  ProjectValidator.store,
  ProjectController.store
);
routes.delete("/project/delete/:id", ProjectController.destroy);

export default routes;
