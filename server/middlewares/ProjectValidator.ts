import { Result, ValidationError, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

export class ProjectValidator {
  static async store(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json(errors);
  }
}
