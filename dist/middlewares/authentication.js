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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorAuth = exports.adminAuth = exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const user_model_1 = require("../model/user.model");
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        }
        ;
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            const user = yield (0, services_1.get_one_user)(decode.id);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
            }
            const userData = {
                id: user._id,
                email: user.email
            };
            req.user = userData;
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.authentication = authentication;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        }
        ;
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            const user = yield (0, services_1.get_one_user)(decode.id);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
            }
            if (user_model_1.RoleType.admin === user.role) {
                next();
            }
            else {
                return res.status(400).json({ success: false, message: "Not authorized" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.adminAuth = adminAuth;
const editorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        }
        ;
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            const user = yield (0, services_1.get_one_user)(decode.id);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
            }
            if (user_model_1.RoleType.editor === user.role) {
                next();
            }
            else {
                return res.status(400).json({ success: false, message: "Not authorized" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.editorAuth = editorAuth;
const editorOrAdmin = (req, res, next) => {
    // Check if the user is an editor or an admin
    if (req.user && (req.user.role === 'editor' || req.user.role === 'admin')) {
        return next(); // If yes, continue to the next middleware/route handler
    }
    else {
        // If not, return a 403 Forbidden error
        return res.status(403).json({ message: 'Forbidden' });
    }
};
