import { Router } from "express";
import { InstantMessageController } from "../controllers/InstantMessageController";

const routes = Router();

routes.get("/message/news/:id", InstantMessageController.getNews);
routes.put("/message/news/:id", InstantMessageController.updateNews);
routes.post("/message", InstantMessageController.one);
routes.delete("/message/delete/:id", InstantMessageController.destroy);

export default routes;
