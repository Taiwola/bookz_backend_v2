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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getOneUser = exports.getAllUser = exports.updateUser = void 0;
const services_1 = require("../services");
const mongoose_1 = require("mongoose");
const userInput_validate_1 = require("../validator/userInput.validate");
// Controller to update user
// Required: Id, UserUpdateInterface
// Returns: JSON object containing message and user object
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract Id from request parameters
    const { Id } = req.params;
    // Extract user update details from request body
    const userUpdate = __rest(req.body, []);
    // Validate user update input
    const validationResult = (0, userInput_validate_1.validateUserUpdateInput)(userUpdate);
    // Return error message in JSON format
    if (validationResult) {
        res.status(400).json({
            message: validationResult,
        });
    }
    ;
    // Validate the user Id
    const validate = (0, mongoose_1.isValidObjectId)(Id);
    if (!validate) {
        // Return error message in JSON format
        return res.status(400).json({ message: "Invalid user ID!" });
    }
    try {
        // Update user with provided Id and user update details
        const user = yield (0, services_1.update_user)(Id, userUpdate);
        if (!user) {
            // Return error message in JSON format
            return res.status(404).json({ message: 'User not found!' });
        }
        // Return success message and user object in JSON format
        res.status(200).json({ message: 'User updated successfully', user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
// Controller to get all users
// Returns: JSON object containing message and an array of user objects
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, services_1.get_all_user)();
    // Return success message and users array in JSON format
    res.status(200).json({
        message: "Success",
        data: users
    });
});
exports.getAllUser = getAllUser;
// Controller to get a single user
// Required: Id
// Returns: JSON object containing message and user object
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    // Validate the user Id
    const validate = (0, mongoose_1.isValidObjectId)(Id);
    if (!validate) {
        // Return error message in JSON format
        return res.status(400).
            json({ message: "Invalid user ID!" });
    }
    ;
    const user = yield (0, services_1.get_one_user)(Id);
    if (!user) {
        return res.status(404).
            json({ message: 'No user found' });
    }
    ;
    // Return success message and user object in JSON format
    res.status(200).json({
        message: "Success",
        data: user
    });
});
exports.getOneUser = getOneUser;
// Middleware to delete a user
// Required: Id
// Returns: JSON object containing message
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    // Validate the user Id
    const validate = (0, mongoose_1.isValidObjectId)(Id);
    if (!validate) {
        // Return error message in JSON format
        return res.status(400).
            json({ message: "Invalid user ID!" });
    }
    ;
    const user = yield (0, services_1.delete_user)(Id);
    if (user.deletedCount === 0) {
        // Return error message in JSON format
        return res.status(404).
            json({ message: 'User not found!' });
    }
    // Return success message in JSON format
    res.status(200).json({
        message: "Success"
    });
});
exports.deleteUser = deleteUser;
