"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAdminRequest = exports.passwordResetConfirmedMail = exports.sendResetTokenMail = exports.sendConfirmationEmail = void 0;
const mailer_1 = require("../utils/mailer");
const path = __importStar(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const hbsOptions = {
    viewEngine: {
        defaultLayout: false
    },
    viewPath: path.join(__dirname, '../../public/views') // Directory where your email templates are located
};
mailer_1.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(hbsOptions));
function sendConfirmationEmail({ email, username, token }) {
    return __awaiter(this, void 0, void 0, function* () {
        let verify;
        try {
            verify = yield (0, mailer_1.verifyTransporter)();
        }
        catch (error) {
            console.log(error);
            return { error: true, errorMessage: error.message };
        }
        if (!verify)
            return { error: true, errorMessage: "" };
        const mailOptions = {
            from: {
                name: "Book Store",
                address: process.env.MAIL_USERNAME,
            },
            to: email,
            subject: "Nodemailer Project",
            template: "confirmation_email",
            context: {
                username: username,
                token: token
            }
        };
        try {
            yield (0, mailer_1.sendMail)(mailOptions);
            return { error: false, errorMessage: "" };
        }
        catch (error) {
            return { error: true, errorMessage: error.message };
        }
    });
}
exports.sendConfirmationEmail = sendConfirmationEmail;
function sendAdminRequest({ email, username, token }) {
    return __awaiter(this, void 0, void 0, function* () {
        let verify;
        try {
            verify = yield (0, mailer_1.verifyTransporter)();
        }
        catch (error) {
            console.log(error);
            return { error: true, errorMessage: error.message };
        }
        if (!verify)
            return { error: true, errorMessage: "" };
        const mailOptions = {
            from: {
                name: "Book Store",
                address: process.env.MAIL_USERNAME,
            },
            to: email,
            subject: "Nodemailer Project",
            template: "request_admin",
            context: {
                username: username,
                token: token
            }
        };
        try {
            yield (0, mailer_1.sendMail)(mailOptions);
            return { error: false, errorMessage: "" };
        }
        catch (error) {
            return { error: true, errorMessage: error.message };
        }
    });
}
exports.sendAdminRequest = sendAdminRequest;
function sendResetTokenMail(email, username, token) {
    return __awaiter(this, void 0, void 0, function* () {
        let verify;
        try {
            verify = yield (0, mailer_1.verifyTransporter)();
        }
        catch (error) {
            console.log(error);
            return { error: true, errorMessage: error.message };
        }
        const mailOptions = {
            from: {
                name: "Book store",
                address: process.env.MAIL_USERNAME
            },
            to: email,
            subject: 'Password Reset Request',
            template: "reset_password",
            context: {
                token: token,
                username: username
            }
        };
        try {
            yield (0, mailer_1.sendMail)(mailOptions);
            return { error: false, errorMessage: "" };
        }
        catch (error) {
            return { error: true, errorMessage: error.message };
        }
    });
}
exports.sendResetTokenMail = sendResetTokenMail;
function passwordResetConfirmedMail(email, username) {
    return __awaiter(this, void 0, void 0, function* () {
        let verify;
        try {
            verify = yield (0, mailer_1.verifyTransporter)();
        }
        catch (error) {
            console.log(error);
            return { error: true, errorMessage: error.message };
        }
        if (!verify)
            return { error: true, errorMessage: "" };
        const mailOptions = {
            from: {
                name: "Book store",
                address: process.env.MAIL_USERNAME
            },
            to: email,
            subject: 'Password Reset',
            text: `Hi ${username},\n\nYour password has been reset. You can now log into your account.\n\nIf you did not request a password reset and got this mail, please contact us at our direct line to issue a complaint .\n`
        };
        try {
            yield (0, mailer_1.sendMail)(mailOptions);
            console.log("Email sent successfully");
            return { error: false, errorMessage: "" };
        }
        catch (error) {
            console.log("Error ", error);
            return { error: true, errorMessage: error.message };
        }
    });
}
exports.passwordResetConfirmedMail = passwordResetConfirmedMail;
