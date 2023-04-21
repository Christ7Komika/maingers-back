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
  check("society")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("codePostal")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1010)
    .isNumeric()
    .withMessage(1020)
    .isLength({ min: 5, max: 5 })
    .withMessage(1050),
  check("email")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010)
    .isEmail()
    .withMessage(1070),
  check("phone")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("country")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("estimateType")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("infos")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
];
