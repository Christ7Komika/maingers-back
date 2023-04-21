import { Result, ValidationError, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";
import { Services } from "../services/Services";

export class ContactValidator {
  static async store(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    if (req.file && !req.file.mimetype.includes("application/pdf")) {
      Services.deleteFile(req.file.path);
      return res.status(400).json({
        errors: "Le format du fichier cv doit être en pdf",
      });
    }

    next();
  }
}
