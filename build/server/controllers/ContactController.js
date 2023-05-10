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
exports.ContactController = void 0;
const database_1 = require("../database");
const path_1 = require("path");
class ContactController {
    static all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.contact.updateMany({
                    where: {
                        new: true,
                    },
                    data: {
                        new: false,
                    },
                });
                return res.status(200).json(yield database_1.prisma.contact.findMany());
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
            const contact = yield database_1.prisma.contact.findUnique({
                where: { id: req.params.id },
            });
            if ((contact === null || contact === void 0 ? void 0 : contact.view) === true) {
                yield database_1.prisma.contact.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        view: false,
                    },
                });
            }
            return res.json(contact);
        });
    }
    static getViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield database_1.prisma.contact.findMany({
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
                const news = (yield database_1.prisma.contact.findMany({
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
    static store({ body, file }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = (file === null || file === void 0 ? void 0 : file.filename) || "-";
            const docPath = (file === null || file === void 0 ? void 0 : file.filename) ? (0, path_1.resolve)(file === null || file === void 0 ? void 0 : file.path) : "-";
            const data = Object.assign(Object.assign({}, body), { file: doc, filePath: docPath });
            try {
                yield database_1.prisma.contact.create({
                    data: Object.assign({}, data),
                });
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
                yield database_1.prisma.contact.delete({ where: { id: req.params.id } });
                return res.status(200).json(yield database_1.prisma.contact.findMany());
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.ContactController = ContactController;
