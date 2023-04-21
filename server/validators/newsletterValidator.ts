import { check } from "express-validator";

export const storeValidate = [
  check("email")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010)
    .isEmail()
    .withMessage(1070),
];
