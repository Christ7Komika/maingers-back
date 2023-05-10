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
exports.NewsLetterController = void 0;
const database_1 = require("../database");
class NewsLetterController {
    static all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.newsLetter.updateMany({
                    where: {
                        new: true,
                    },
                    data: {
                        new: false,
                    },
                });
                return res.status(200).json(yield database_1.prisma.newsLetter.findMany());
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
            return res.json(yield database_1.prisma.newsLetter.findUnique({
                where: { id: req.params.id },
            }));
        });
    }
    static getNews(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield database_1.prisma.newsLetter.findMany({
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
                yield database_1.prisma.newsLetter.create({
                    data: Object.assign({}, body),
                });
                return res.status(200).end();
            }
            catch (e) {
                const err = e;
                if (err.code === "P2002") {
                    return res.status(500).json({
                        status: 4000,
                    });
                }
                return res.status(500).json({
                    error: err,
                    status: 3000,
                });
            }
        });
    }
    static destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.newsLetter.delete({ where: { id: req.params.id } });
                return res.status(200).json(yield database_1.prisma.newsLetter.findMany());
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.NewsLetterController = NewsLetterController;
