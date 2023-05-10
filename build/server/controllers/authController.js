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
exports.AuthController = void 0;
const database_1 = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env_1 = require("../../env");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const operator = yield AuthController.validateEmail(email);
                if (!operator) {
                    return res.status(400).json({ message: "Identifiant invalide." });
                }
                if (!AuthController.validatePass(password, operator.password)) {
                    return res.status(400).json({ message: "Identifiant invalide." });
                }
                // Generate an access token
                const token = AuthController.generateToken(operator);
                // Generate a refresh token
                const refresh = jwt.sign(operator, env_1.default.refresh);
                // Add to refresh token
                AuthController.refreshTokens.push(refresh);
                return res.status(200).json({
                    token: token,
                    refresh: refresh,
                });
            }
            catch (err) {
                return res.status(400).json({
                    message: "Identifiant invalide",
                    error: err,
                });
            }
        });
    }
    static getOperator(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.token;
            const operator = (_a = jwt.decode(token, { complete: true })) === null || _a === void 0 ? void 0 : _a.payload;
            return res.json(operator);
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthController.refreshTokens = AuthController.refreshTokens.filter((token) => token !== req.body.token);
            return res.status(200).json("logout success");
        });
    }
    static validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const operator = yield database_1.prisma.operator.findUnique({
                where: {
                    email: email,
                },
            });
            if (operator)
                return operator;
            return false;
        });
    }
    static refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.body.token;
            if (!refreshToken)
                return res.status(401).json("Token invalide");
            if (!AuthController.refreshTokens.includes(refreshToken)) {
                return res.status(401).json("Token inexistant");
            }
            jwt.verify(refreshToken, env_1.default.refresh, (err, user) => {
                if (err)
                    return res.status(401);
                const operator = user;
                const accessToken = AuthController.generateToken(operator);
                return res.json({ accessToken: accessToken });
            });
        });
    }
    static isAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (!token)
                return res.status(401).json("Aucun token trouvé");
            jwt.verify(token, env_1.default.secret, (error, user) => {
                if (error)
                    return res.status(200).json("Token invalide");
                req.user = user;
                next();
            });
        });
    }
    static generateToken(operator) {
        return jwt.sign(operator, env_1.default.secret, { expiresIn: "3600s" });
    }
    static validatePass(pwd, hash) {
        if (bcrypt.compareSync(pwd, hash)) {
            return true;
        }
        return false;
    }
}
exports.AuthController = AuthController;
AuthController.refreshTokens = [];
