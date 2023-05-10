"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storageEngine = multer.diskStorage({
    destination: "./server/upload/contact/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "---" + file.originalname);
    },
});
const uploadContactFile = multer({
    storage: storageEngine,
}).single("contact");
exports.default = uploadContactFile;
