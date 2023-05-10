"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storageEngine = multer.diskStorage({
    destination: "./server/upload/estimate/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "---" + file.originalname);
    },
});
const uploadEstimateFile = multer({
    storage: storageEngine,
}).single("estimate");
exports.default = uploadEstimateFile;
