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
  check("phone")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),

  check("civility")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("country")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("targetPosition")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("contractType")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("jobSearch")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
];
