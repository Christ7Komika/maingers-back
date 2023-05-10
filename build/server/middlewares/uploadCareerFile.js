"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storageEngine = multer.diskStorage({
    destination: "./server/upload/career/",
    filename: (req, file, cb) => {
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
exports.default = uploadCareerFile;
