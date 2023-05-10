"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    host: process.env.HOST,
    port: process.env.PORT,
    secret: process.env.SECRET,
    refresh: process.env.SECRET,
    session: process.env.SESSION,
};
