import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { ClientValidator } from "../middlewares/ClientValidator";
import { storeValidate } from "../validators/clientValidator";

const routes = Router();

routes.get("/client", ClientController.all);
routes.get("/client/:id", ClientController.one);
routes.get("/client/message/new/:id", ClientController.handleNew);
routes.post(
  "/client",
  storeValidate,
  ClientValidator.store,
  ClientController.store
);
routes.delete("/client/delete/:id", ClientController.destroy);

export default routes;
