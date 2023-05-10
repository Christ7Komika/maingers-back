"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const database_1 = require("../database");
class ProjectController {
    static all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.project.updateMany({
                    where: {
                        new: true,
                    },
                    data: {
                        new: false,
                    },
                });
                return res.status(200).json(yield database_1.prisma.project.findMany());
            }
            catch (err) {
                return res.status(500).json({
                    message: "Une erreur a été rencontré lors de la récupération des données",
                    error: err,
                });
            }
        });
    }
    static one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield database_1.prisma.project.findUnique({
                where: { id: req.params.id },
            });
            if ((project === null || project === void 0 ? void 0 : project.view) === true) {
                yield database_1.prisma.project.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        view: false,
                    },
                });
            }
            return res.json(project);
        });
    }
    static getViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield database_1.prisma.project.findMany({
                    where: {
                        view: true,
                    },
                    select: {
                        id: true,
                    },
                })).length;
                return res.status(200).json(news);
            }
            catch (err) {
                return res.status(500).json({
                    message: "Une erreur a été rencontré lors de la récuperation des données",
                    error: err,
                });
            }
        });
    }
    static getNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield database_1.prisma.project.findMany({
                    where: {
                        new: true,
                    },
                    select: {
                        id: true,
                    },
                })).length;
                return res.status(200).json(news);
            }
            catch (err) {
                return res.status(500).json({
                    message: "Une erreur a été rencontré lors de la récuperation des données",
                    error: err,
                });
            }
        });
    }
    static store({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.project.create({ data: Object.assign({}, body) });
                return res.status(200).end();
            }
            catch (err) {
                return res.status(500).json();
            }
        });
    }
    static destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.project.delete({ where: { id: req.params.id } });
                return res.status(200).json(yield database_1.prisma.project.findMany());
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.ProjectController = ProjectController;
