import { Router } from "express";
import { CareerController } from "../controllers/CareerController";
import { storeValidate } from "../validators/careerValidator";
import uploadCareerFile from "../middlewares/uploadCareerFile";
import { CareerValidator } from "../middlewares/CareerValidator";

const routes = Router();

routes.get("/career", CareerController.all);
routes.get("/career/:id", CareerController.one);
routes.get("/career/new/number", CareerController.getNews);
routes.get("/career/view/number", CareerController.getViews);

routes.post(
  "/career",
  uploadCareerFile,
  storeValidate,
  CareerValidator.store,
  CareerController.store
);
routes.delete("/career/delete/:id", CareerController.destroy);

export default routes;
