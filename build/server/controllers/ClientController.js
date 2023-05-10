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
exports.ClientController = void 0;
const database_1 = require("../database");
class ClientController {
    static all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json(yield database_1.prisma.client.findMany({
                select: {
                    id: true,
                    clientSocketId: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    message: {
                        where: {
                            isClient: true,
                            isNew: true,
                        },
                        select: {
                            isNew: true,
                        },
                    },
                },
            }));
        });
    }
    static one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json(yield database_1.prisma.client.findFirst({
                where: {
                    clientSocketId: req.params.id,
                },
                select: {
                    id: true,
                    clientSocketId: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }));
        });
    }
    static handleNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.instantMessage.updateMany({
                    where: {
                        clientId: req.params.id,
                        isClient: true,
                        isNew: true,
                    },
                    data: {
                        isNew: false,
                    },
                });
                return res.status(200).json(yield database_1.prisma.client.findMany({
                    select: {
                        id: true,
                        clientSocketId: true,
                        name: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                        message: {
                            where: {
                                isClient: true,
                                isNew: true,
                            },
                            select: {
                                isNew: true,
                            },
                        },
                    },
                }));
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static store({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.client.create({
                    data: Object.assign({}, body),
                });
                return res.status(200).end();
            }
            catch (err) {
                return res.status(400).json(err);
            }
        });
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ClientController = ClientController;
