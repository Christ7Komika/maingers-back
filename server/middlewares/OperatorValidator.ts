import { Result, ValidationError, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";
import { prisma } from "../database";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import env from "../../env";

export type LoginData = { email: string; password: string };
type AuthType = { data: string };
type DecodeToken = {
  id: string;
  startDate: number;
  iat: number;
  exp: number;
};

export class OperatorValidator {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json(errors);
  }

  static async verifyLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password }: LoginData = req.body;

    const operator = await prisma.operator.findFirst({
      where: {
        email: email,
      },
    });

    if (!operator) {
      return res.status(400).json(4010);
    }

    if (!compareSync(password, operator.password)) {
      return res.status(400).json(4010);
    }

    next();
  }

  static async isLogin(req: Request, res: Response, next: NextFunction) {
    console.log("one");
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      next();
    }
    res.status(404).json({ message: "Vous n'êtes pas authentifier" });
  }
}
