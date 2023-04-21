import { Result, ValidationError, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";
import { CareerFiles } from "./uploadCareerFile";
import { Services } from "../services/Services";

export class CareerValidator {
  static async store(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const files = req.files as unknown as CareerFiles;

    if (
      !(
        files.photo[0].mimetype.includes("image/jpeg") ||
        files.photo[0].mimetype.includes("image/png")
      )
    ) {
      Services.deleteFile(files.photo[0].path);
      return res.status(400).json({
        errors: "Le format de le photo doit être en png ou jpeg",
      });
    }

    if (!files.cv[0].mimetype.includes("application/pdf")) {
      Services.deleteFile(files.cv[0].path);
      return res.status(400).json({
        errors: "Le format du fichier cv doit être en pdf",
      });
    }

    if (!files.motivation[0].mimetype.includes("application/pdf")) {
      Services.deleteFile(files.motivation[0].path);
      return res.status(400).json({
        errors: "Le format de la lêttre de motivation doit être en pdf",
      });
    }

    next();
  }
}
