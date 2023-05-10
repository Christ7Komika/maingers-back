"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = exports.storeValidate = void 0;
const express_validator_1 = require("express-validator");
exports.storeValidate = [
    (0, express_validator_1.check)("firstname")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("lastname")
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
    (0, express_validator_1.check)("post")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("password")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010)
        .isLength({ min: 8 })
        .withMessage(1040),
];
exports.loginValidate = [
    (0, express_validator_1.check)("email")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010)
        .isEmail()
        .withMessage(1070),
    (0, express_validator_1.check)("password")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010)
        .isLength({ min: 8 })
        .withMessage(1040),
];
