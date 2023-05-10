"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidate = void 0;
const express_validator_1 = require("express-validator");
exports.storeValidate = [
    (0, express_validator_1.check)("name")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("email")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010)
        .isEmail()
        .withMessage(1070),
    (0, express_validator_1.check)("phone")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("object")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("message")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
];
