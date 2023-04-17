"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.NODE_MAILER_HOST,
    port: Number(process.env.NODE_MAILER_PORT || 587),
    service: process.env.NODE_MAILER_SERVICE,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
});
exports.default = transporter;
//# sourceMappingURL=nodemailer.config.js.map