import multer, { diskStorage } from "multer";
import { Request } from "express";

const storageEngine = diskStorage({
  destination: "./server/upload/estimate/",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const uploadEstimateFile = multer({
  storage: storageEngine,
}).single("estimate");

export default uploadEstimateFile;
