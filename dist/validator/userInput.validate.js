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
exports.validateUpdateInput = exports.validateAuthInput = exports.validateUserInput = exports.validateUserUpdateInput = exports.validateUserCreateInput = void 0;
const user_model_1 = require("../model/user.model");
const joi_1 = __importDefault(require("joi"));
function validateUserCreateInput(input) {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email) {
        return "Email is required";
    }
    else if (!emailRegex.test(input.email.trim())) {
        return "Invalid email format";
    }
    // Validate password
    if (!input.password) {
        return "Password is required";
    }
    else if (input.password.length < 6 || input.password.length > 12) {
        return "Password must be between 6 and 12 characters long";
    }
    // Validate firstName
    if (typeof input.firstName !== 'string') {
        return "First name must be a string";
    }
    else if (!input.firstName) {
        return "First name is required";
    }
    // Validate lastName
    if (typeof input.lastName !== 'string') {
        return "Last name must be a string";
    }
    else if (!input.lastName) {
        return "Last name is required";
    }
    // Validate role
    // if (!(input.role in RoleType)) {
    //     return "Invalid role";
    // }
    // Validation passed
    return null;
}
exports.validateUserCreateInput = validateUserCreateInput;
function validateUserUpdateInput(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.email && !emailRegex.test(input.email.trim())) {
        return "Invalid email format";
    }
    const enumValues = Object.values(user_model_1.RoleType);
    // Validate firstName
    if (input.firstName && !input.firstName.trim()) {
        return "First name is required";
    }
    if (typeof input.firstName !== 'string') {
        return "firstname must be string";
    }
    ;
    // Validate lastName
    if (input.lastName && !input.lastName.trim()) {
        return "Last name is required";
    }
    if (typeof input.lastName !== 'string') {
        return "Lastname must be string";
    }
    ;
    if (input.password && (input.password.length < 6 || input.password.length > 12)) {
        return "Password must be between 6 and 12 characters long";
    }
    // Validate role
    if (input.role) {
        const enumValues = Object.values(user_model_1.RoleType);
        if (!enumValues.includes(input.role)) {
            return "Invalid role";
        }
    }
    // Validation passed
    return null;
}
exports.validateUserUpdateInput = validateUserUpdateInput;
const validateUserInput = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const Schema = joi_1.default.object().keys({
            email: joi_1.default.string().email().required().regex(emailRegex),
            firstName: joi_1.default.string().required(),
            password: joi_1.default.string().min(4).max(8).alphanum().required(),
            lastName: joi_1.default.string().required()
        });
        yield Schema.validateAsync({
            email: userInput.email,
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            password: userInput.password
        });
    }
    catch (error) {
        return 'Validation error: ' + " " + error.message;
    }
});
exports.validateUserInput = validateUserInput;
const validateAuthInput = (authInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const authSchema = joi_1.default.object().keys({
            email: joi_1.default.string().email().required().regex(emailRegex),
            password: joi_1.default.string().required()
        });
        yield authSchema.validateAsync(authInput);
    }
    catch (error) {
        return 'Validation error: ' + " " + error.message;
    }
});
exports.validateAuthInput = validateAuthInput;
const validateUpdateInput = (updateInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const authSchema = joi_1.default.object().keys({
            email: joi_1.default.string().email().regex(emailRegex),
            password: joi_1.default.string(),
            firstName: joi_1.default.string(),
            lastName: joi_1.default.string()
        });
        yield authSchema.validateAsync(updateInput);
    }
    catch (error) {
        return 'Validation error: ' + " " + error.message;
    }
});
exports.validateUpdateInput = validateUpdateInput;
