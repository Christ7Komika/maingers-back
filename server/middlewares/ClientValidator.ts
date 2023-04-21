import { Result, ValidationError, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

export class ClientValidator {
  static async store(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    next();
  }
}
