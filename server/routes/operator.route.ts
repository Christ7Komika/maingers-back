import { Router } from "express";
import { OperatorController } from "../controllers/OperatorController";
import { storeValidate } from "../validators/operatorValidator";
import { OperatorValidator } from "../middlewares/OperatorValidator";

const routes = Router();

routes.get("/operator", OperatorController.all);
routes.get("/operator/:id", OperatorController.one);
routes.post(
  "/operator/register",
  storeValidate,
  OperatorValidator.validate,
  OperatorController.register
);
routes.post("/operator/role/:id", OperatorController.switchRole);
routes.delete("/operator/delete/:id", OperatorController.destroy);

export default routes;
