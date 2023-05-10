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
exports.OperatorValidator = void 0;
const express_validator_1 = require("express-validator");
const database_1 = require("../database");
const bcrypt_1 = require("bcrypt");
class OperatorValidator {
    static validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty()) {
                return next();
            }
            return res.status(400).json(errors);
        });
    }
    static verifyLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const operator = yield database_1.prisma.operator.findFirst({
                where: {
                    email: email,
                },
            });
            if (!operator) {
                return res.status(400).json(4010);
            }
            if (!(0, bcrypt_1.compareSync)(password, operator.password)) {
                return res.status(400).json(4010);
            }
            next();
        });
    }
    static isLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("one");
            console.log(req.isAuthenticated());
            if (req.isAuthenticated()) {
                next();
            }
            res.status(404).json({ message: "Vous n'êtes pas authentifier" });
        });
    }
}
exports.OperatorValidator = OperatorValidator;
