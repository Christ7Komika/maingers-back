import multer, { diskStorage } from "multer";
import { Request } from "express";

const storageEngine = diskStorage({
  destination: "./server/upload/contact/",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const uploadContactFile = multer({
  storage: storageEngine,
}).single("contact");

export default uploadContactFile;
