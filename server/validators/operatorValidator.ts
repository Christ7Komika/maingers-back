import { check } from "express-validator";

export const storeValidate = [
  check("firstname")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("lastname")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("email")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010)
    .isEmail()
    .withMessage(1070),
  check("post")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("password")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010)
    .isLength({ min: 8 })
    .withMessage(1040),
];

export const loginValidate = [
  check("email")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010)
    .isEmail()
    .withMessage(1070),
  check("password")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010)
    .isLength({ min: 8 })
    .withMessage(1040),
];
