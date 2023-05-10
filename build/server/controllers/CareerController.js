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
exports.CareerController = void 0;
const database_1 = require("../database");
const path_1 = require("path");
class CareerController {
    static all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.career.updateMany({
                    where: {
                        new: true,
                    },
                    data: {
                        new: false,
                    },
                });
                return res.status(200).json(yield database_1.prisma.career.findMany());
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
            const career = yield database_1.prisma.career.findUnique({
                where: { id: req.params.id },
            });
            if ((career === null || career === void 0 ? void 0 : career.view) === true) {
                yield database_1.prisma.career.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        view: false,
                    },
                });
            }
            return res.json(career);
        });
    }
    static getViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield database_1.prisma.career.findMany({
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
                const news = (yield database_1.prisma.career.findMany({
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
    static store({ body, files }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploads = files;
            const photo = uploads.photo[0];
            const cv = uploads.cv[0];
            const motivation = uploads.motivation[0];
            const data = Object.assign(Object.assign({}, body), { photo: photo.filename, photoPath: (0, path_1.resolve)(photo.path), cv: cv.fieldname, cvPath: (0, path_1.resolve)(cv.path), motivationLetter: motivation.fieldname, motivationLetterPath: (0, path_1.resolve)(motivation.path) });
            try {
                yield database_1.prisma.career.create({
                    data: Object.assign({}, data),
                });
                return res.status(200).end();
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.career.delete({ where: { id: req.params.id } });
                return res.status(200).json(yield database_1.prisma.career.findMany());
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.CareerController = CareerController;
