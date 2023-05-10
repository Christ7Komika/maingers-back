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
    (0, express_validator_1.check)("society")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("codePostal")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1010)
        .isNumeric()
        .withMessage(1020)
        .isLength({ min: 5, max: 5 })
        .withMessage(1050),
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
    (0, express_validator_1.check)("country")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("estimateType")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
    (0, express_validator_1.check)("infos")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(1000)
        .isString()
        .withMessage(1010),
];
