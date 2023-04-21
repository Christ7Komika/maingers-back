import { Router } from "express";
import career from "./career.route";
import client from "./client.route";
import contact from "./contact.route";
import estimate from "./estimate.route";
import instantMessage from "./instantMessage.route";
import operator from "./operator.route";
import project from "./project.route";
import newsletter from "./newsletter.route";
import auth from "./auth.route";

const routes = Router();

routes.use(career);
routes.use(client);
routes.use(contact);
routes.use(estimate);
routes.use(instantMessage);
routes.use(operator);
routes.use(project);
routes.use(newsletter);
routes.use(auth);

export default routes;
