import { Router } from "express";
import { ContactController } from "../controllers/ContactController";
import uploadContactFile from "../middlewares/uploadContactFile";
import { ContactValidator } from "../middlewares/ContactValidator";
import { storeValidate } from "../validators/contactValidator";

const routes = Router();

routes.get("/contact", ContactController.all);
routes.get("/contact/:id", ContactController.one);
routes.get("/contact/new/number", ContactController.getNews);
routes.get("/contact/view/number", ContactController.getViews);

routes.post(
  "/contact",
  uploadContactFile,
  storeValidate,
  ContactValidator.store,
  ContactController.store
);
routes.delete("/contact/delete/:id", ContactController.destroy);

export default routes;
