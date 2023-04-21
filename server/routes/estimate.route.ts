import { Router } from "express";
import { EstimateController } from "../controllers/EstimateController";
import uploadEstimateFile from "../middlewares/uploadEstimateFile";
import { EstimateValidator } from "../middlewares/estimateValidatore";
import { storeValidate } from "../validators/estimateValidator";

const routes = Router();

routes.get("/estimate", EstimateController.all);
routes.get("/estimate/:id", EstimateController.one);
routes.get("/estimate/new/number", EstimateController.getNews);
routes.get("/estimate/view/number", EstimateController.getViews);

routes.post(
  "/estimate",
  uploadEstimateFile,
  storeValidate,
  EstimateValidator.store,
  EstimateController.store
);
routes.delete("/estimate/delete/:id", EstimateController.destroy);
export default routes;
