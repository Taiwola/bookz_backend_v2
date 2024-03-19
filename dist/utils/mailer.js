"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.verifyTransporter = exports.transporter = void 0;
const nodemailer = require('nodemailer');
const { createTransport } = nodemailer;
exports.transporter = createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});
const verifyTransporter = () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.transporter.verify(); });
exports.verifyTransporter = verifyTransporter;
const sendMail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () { return yield exports.transporter.sendMail(mailOptions); });
exports.sendMail = sendMail;
