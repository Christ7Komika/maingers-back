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
exports.InstantMessageController = void 0;
const database_1 = require("../database");
class InstantMessageController {
    static one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = req.body.clientId;
            const operatorId = req.body.operatorId;
            const clientData = yield database_1.prisma.instantMessage.findMany({
                where: {
                    clientId: clientId,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            const operatorData = yield database_1.prisma.instantMessage.findMany({
                where: {
                    operatorId: operatorId,
                },
                select: {
                    id: true,
                    clientId: true,
                    isChanged: true,
                    isClient: true,
                    isNew: true,
                    message: true,
                    updatedAt: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            console.log(operatorData);
            const client = clientId ? clientData : [];
            const operator = operatorId ? operatorData : [];
            return res.status(200).json([...client, ...operator]);
        });
    }
    static getNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json((yield database_1.prisma.instantMessage.findMany({
                where: {
                    clientId: req.params.id,
                    AND: {
                        isNew: true,
                    },
                },
            })).length);
        });
    }
    static updateNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.instantMessage.updateMany({
                where: {
                    clientId: req.params.id,
                    AND: {
                        isNew: true,
                    },
                },
                data: {
                    isNew: false,
                },
            });
            return res.status(200).end();
        });
    }
    static store() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.InstantMessageController = InstantMessageController;
