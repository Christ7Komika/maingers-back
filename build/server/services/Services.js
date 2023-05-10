"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Services {
    static deleteFile(path) {
        if ((0, fs_1.existsSync)((0, path_1.resolve)(path))) {
            (0, fs_1.unlinkSync)((0, path_1.resolve)(path));
        }
    }
}
exports.Services = Services;
