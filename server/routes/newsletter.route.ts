import { Router } from "express";
import { NewsLetterController } from "../controllers/NewsletterController";
import { storeValidate } from "../validators/newsletterValidator";
import { NewsLetterValidator } from "../middlewares/NewsLetterValidator";

const routes = Router();

routes.get("/newsletter", NewsLetterController.all);
routes.get("/newsletter/:id", NewsLetterController.one);
routes.get("/newsletter/new/number", NewsLetterController.getNews);
routes.post(
  "/newsletter",
  storeValidate,
  NewsLetterValidator.store,
  NewsLetterController.store
);
routes.delete("/newsletter/delete/:id", NewsLetterController.destroy);

export default routes;
