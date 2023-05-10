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
exports.CareerValidator = void 0;
const express_validator_1 = require("express-validator");
const Services_1 = require("../services/Services");
class CareerValidator {
    static store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            const files = req.files;
            if (!(files.photo[0].mimetype.includes("image/jpeg") ||
                files.photo[0].mimetype.includes("image/png"))) {
                Services_1.Services.deleteFile(files.photo[0].path);
                return res.status(400).json({
                    errors: "Le format de le photo doit être en png ou jpeg",
                });
            }
            if (!files.cv[0].mimetype.includes("application/pdf")) {
                Services_1.Services.deleteFile(files.cv[0].path);
                return res.status(400).json({
                    errors: "Le format du fichier cv doit être en pdf",
                });
            }
            if (!files.motivation[0].mimetype.includes("application/pdf")) {
                Services_1.Services.deleteFile(files.motivation[0].path);
                return res.status(400).json({
                    errors: "Le format de la lêttre de motivation doit être en pdf",
                });
            }
            next();
        });
    }
}
exports.CareerValidator = CareerValidator;
