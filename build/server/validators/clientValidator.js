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
        .trim()
        .custom((email) => {
        if (!email) {
            return true;
        }
        if (email &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    })
        .withMessage(1070),
];
