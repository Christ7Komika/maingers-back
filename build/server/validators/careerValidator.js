"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidate = void 0;
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
    (0, express_validator_1.check)("phone")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("civility")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("country")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("targetPosition")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("contractType")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("jobSearch")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
];
