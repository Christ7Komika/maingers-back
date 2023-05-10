"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controllers/ProjectController");
const projectValidator_1 = require("../validators/projectValidator");
const ProjectValidator_1 = require("../middlewares/ProjectValidator");
const routes = (0, express_1.Router)();
routes.get("/project", ProjectController_1.ProjectController.all);
routes.get("/project/:id", ProjectController_1.ProjectController.one);
routes.get("/project/new/number", ProjectController_1.ProjectController.getNews);
routes.get("/project/view/number", ProjectController_1.ProjectController.getViews);
routes.post("/project", projectValidator_1.storeValidate, ProjectValidator_1.ProjectValidator.store, ProjectController_1.ProjectController.store);
routes.delete("/project/delete/:id", ProjectController_1.ProjectController.destroy);
exports.default = routes;