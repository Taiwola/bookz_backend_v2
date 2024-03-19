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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmAdmin = exports.requestAdminRole = exports.resetPassword = exports.forgotPassword = exports.login = exports.confirmEmail = exports.createUser = void 0;
const userInput_validate_1 = require("../validator/userInput.validate");
const services_1 = require("../services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../model/user.model");
const mailer_1 = require("../lib/mailer");
const token_1 = require("../lib/token");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputUser = __rest(req.body, []);
    const validateInput = (0, userInput_validate_1.validateUserCreateInput)(inputUser);
    if (validateInput) {
        return res.status(400).json({
            message: validateInput
        });
    }
    ;
    const userExist = yield (0, services_1.get_one_user_email)(inputUser.email);
    if (userExist) {
        return res.status(404).json({
            message: "Email already in use"
        });
    }
    ;
    const hashPwd = yield bcryptjs_1.default.hash(inputUser.password, 10);
    const inputData = Object.assign(Object.assign({}, inputUser), { password: hashPwd, role: user_model_1.RoleType.reader });
    try {
        const saveUser = yield (0, services_1.create_user)(inputData);
        const token = yield (0, token_1.generateToken)(saveUser._id, saveUser.email);
        const { error, errorMessage } = yield (0, mailer_1.sendConfirmationEmail)({
            email: inputUser.email,
            username: inputUser.firstName + ' ' + inputUser.lastName,
            token: token
        });
        if (error) {
            console.log(errorMessage);
        }
        return res.status(201).json({
            message: "User created successfully",
            user: saveUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});
exports.createUser = createUser;
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmation_token } = req.query;
    const token = (0, token_1.removeDollarSign)(confirmation_token);
    const verify = yield (0, token_1.verifyToken)(token);
    if (verify === null) {
        return res.status(403).json({
            message: "Invalid or expired session"
        });
    }
    const user = yield (0, services_1.get_one_user)(verify.id);
    if (!user) {
        return res.status(403).json({
            message: "user does not exist"
        });
    }
    ;
    const confirmData = {
        confirm: true
    };
    const confirmUser = yield (0, services_1.update_user)(user._id, confirmData);
    return res.status(200).json({
        message: "Email confirmed successfully"
    });
});
exports.confirmEmail = confirmEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInput = __rest(req.body, []);
        const validateInput = (0, userInput_validate_1.validateAuthInput)(userInput);
        if (!validateInput) {
            return res.status(400).json({
                message: validateInput
            });
        }
        ;
        const user = yield (0, services_1.get_one_user_email)(userInput.email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        ;
        const isMatch = yield bcryptjs_1.default.compare(userInput.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        ;
        // create token
        const token = yield (0, token_1.generateToken)(user._id, user.email);
        const result = user;
        res.cookie('auth-token', token, { httpOnly: true, sameSite: "none", secure: process.env.NODE_ENV === 'production', maxAge: 86400000 });
        return res.status(200).json({
            data: result,
            accessToken: token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield (0, services_1.get_one_user_email)(email);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    ;
    const token = yield (0, token_1.generateToken)(user._id, user.email);
    const username = user.firstName + ' ' + user.lastName;
    try {
        const { error, errorMessage } = yield (0, mailer_1.sendResetTokenMail)(user.email, username, token);
        if (error) {
            console.log(errorMessage);
        }
        return res.status(200).json({
            message: "Check your email to reset your password"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reset_token } = req.query;
        let { password } = req.body;
        const validateInput = yield (0, userInput_validate_1.validateUpdateInput)({ password });
        if (validateInput) {
            return res.status(400).json({
                message: validateInput
            });
        }
        ;
        const token = (0, token_1.removeDollarSign)(reset_token);
        const validateToken = yield (0, token_1.verifyToken)(token);
        const user = yield (0, services_1.get_one_user)(validateToken === null || validateToken === void 0 ? void 0 : validateToken.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        ;
        const hashpwd = yield bcryptjs_1.default.hash(password, 10);
        password = hashpwd;
        const updatePassword = yield (0, services_1.update_user)(user._id, password);
        return res.status(200).json({ message: "Request successful" });
    }
    catch (error) {
        console.log('Error resetting password:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.resetPassword = resetPassword;
const requestAdminRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userExist = yield (0, services_1.get_one_user_email)(email);
    if (!userExist) {
        return res.status(404).json({ message: "user not found" });
    }
    ;
    const token = yield (0, token_1.generateToken)(userExist._id, userExist.email);
    const username = userExist.firstName + ' ' + userExist.lastName;
    try {
        const { error, errorMessage } = yield (0, mailer_1.sendAdminRequest)({
            email: userExist.email,
            username: username,
            token: token.toString()
        });
        if (error) {
            console.log(errorMessage);
        }
        return res.status(200).json({
            message: "Email sent"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.requestAdminRole = requestAdminRole;
const confirmAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin_request } = req.query;
    try {
        const token = (0, token_1.removeDollarSign)(admin_request);
        const validateToken = yield (0, token_1.verifyToken)(token);
        const user = yield (0, services_1.get_one_user)(validateToken === null || validateToken === void 0 ? void 0 : validateToken.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        ;
        const userUpdate = yield (0, services_1.update_user)(user._id, { role: user_model_1.RoleType.admin });
        return res.status(200).json({ message: "Request was successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.confirmAdmin = confirmAdmin;
