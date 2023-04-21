import multer, { diskStorage } from "multer";
import { Request } from "express";

export interface FileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface CareerFiles {
  photo: [FileType];
  cv: [FileType];
  motivation: [FileType];
}

const storageEngine = diskStorage({
  destination: "./server/upload/career/",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const uploadCareerFile = multer({
  storage: storageEngine,
}).fields([
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "cv",
    maxCount: 1,
  },
  {
    name: "motivation",
    maxCount: 1,
  },
]);

export default uploadCareerFile;
