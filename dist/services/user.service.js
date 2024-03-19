"use strict";
/**
* This user service module contains the main functions for handling user-related operations.
* These functions are used to create, update, delete, and retrieve users from the database.
*/
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
exports.delete_user = exports.get_one_user_email = exports.get_one_user = exports.get_all_user = exports.update_user = exports.create_user = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
/**
* Creates a new user in the database with the provided user data.
*
* @param {UserCreateInterface} userData - An object containing the user data to be created.
* @returns {Promise<User>} - A promise that resolves to the newly created user object.
*/
const create_user = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(Object.assign({}, userData));
    return user;
});
exports.create_user = create_user;
/**
* Updates an existing user in the database with the provided user data.
*
* @param {string} id - The unique ID of the user to be updated.
* @param {UserUpdateInterface} userUpdate - An object containing the user data to be updated.
* @returns {Promise<User>} - A promise that resolves to the updated user object.
*/
const update_user = (id, userUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, userUpdate), { new: true });
    return user;
});
exports.update_user = update_user;
/**
* Retrieves all users from the database.
*
* @returns {Promise<UserType[]>} - A promise that resolves to an array of user objects.
*/
const get_all_user = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.find();
    return user;
});
exports.get_all_user = get_all_user;
/**
* Retrieves a single user from the database with the provided ID.
*
* @param {string} id - The unique ID of the user to be retrieved.
* @returns {Promise<User | null>} - A promise that resolves to the user object or null if not found.
*/
const get_one_user = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    return user;
});
exports.get_one_user = get_one_user;
/**
* Retrieves a single user from the database with the provided email.
*
* @param {string} email - The email of the user to be retrieved.
* @returns {Promise<User | null>} - A promise that resolves to the user object or null if not found.
*/
const get_one_user_email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email: email
    });
    return user;
});
exports.get_one_user_email = get_one_user_email;
/**
 * Deletes a user from the database with the provided ID.
 *
 * @param {string} id - The unique ID of the user to be deleted.
 * */
const delete_user = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const del_user = yield user_model_1.default.deleteOne({
        _id: id
    });
    return del_user;
});
exports.delete_user = delete_user;
