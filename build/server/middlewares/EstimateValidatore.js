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
exports.EstimateValidator = void 0;
const express_validator_1 = require("express-validator");
const Services_1 = require("../services/Services");
class EstimateValidator {
    static store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            if (req.file && !req.file.mimetype.includes("application/pdf")) {
                Services_1.Services.deleteFile(req.file.path);
                return res.status(400).json({
                    errors: "Le format du fichier  doit être en pdf",
                });
            }
            next();
        });
    }
}
exports.EstimateValidator = EstimateValidator;
