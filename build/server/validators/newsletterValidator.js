"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidate = void 0;
const express_validator_1 = require("express-validator");
exports.storeValidate = [
    (0, express_validator_1.check)("email")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010)
        .isEmail()
        .withMessage(1070),
];
