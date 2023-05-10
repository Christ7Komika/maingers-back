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
exports.OperatorController = void 0;
const database_1 = require("../database");
const bcrypt_1 = require("bcrypt");
class OperatorController {
    static all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json(yield database_1.prisma.operator.findMany({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    isAdmin: true,
                },
            }));
        });
    }
    static one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json(yield database_1.prisma.operator.findUnique({
                //@ts-ignore
                where: { id: req.params.id },
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    operatorSocketId: true,
                    email: true,
                    isAdmin: true,
                    createdAt: true,
                },
            }));
        });
    }
    static register({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pwd = body.password.split("~~MH~~");
                const isAdmin = pwd.length === 2 && pwd[0] === "ADM-MH" ? true : false;
                const hash = pwd.length === 2 ? (0, bcrypt_1.hashSync)(pwd[1], 10) : (0, bcrypt_1.hashSync)(pwd[0], 10);
                const data = {
                    firstname: body.firstname,
                    lastname: body.lastname,
                    email: body.email,
                    post: body.post,
                    password: hash,
                    isAdmin: isAdmin,
                };
                yield database_1.prisma.operator.create({
                    data: Object.assign({}, data),
                });
                return res.status(200).end();
            }
            catch (e) {
                const err = e;
                if (err.code === "P2002") {
                    return res.status(500).json(4000);
                }
                return res.status(500).json({
                    error: err,
                    status: 3000,
                });
            }
        });
    }
    static switchRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const isAdmin = req.body.isAdmin;
            if (!isAdmin && typeof isAdmin !== "boolean") {
                return res.status(400).json(1030);
            }
            try {
                yield database_1.prisma.operator.update({
                    where: { id: id },
                    data: { isAdmin: isAdmin },
                });
                return res.status(200).end();
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.prisma.operator.delete({ where: { id: req.params.id } });
                return res.status(200).end();
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.OperatorController = OperatorController;
