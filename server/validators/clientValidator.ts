import { check } from "express-validator";

export const storeValidate = [
  check("name")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(1000)
    .isString()
    .withMessage(1010),
  check("email")
    .trim()
    .custom((email: string) => {
      if (!email) {
        return true;
      }
      if (
        email &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ) {
        return true;
      }
      return false;
    })
    .withMessage(1070),
];
