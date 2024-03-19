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
exports.deleteBook = exports.updateBook = exports.getOneBook = exports.getAllBook = exports.createBook = void 0;
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const book_service_1 = require("../services/book.service");
const mongoose_1 = require("mongoose");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const bookInput = __rest(req.body, []);
    if (!image) {
        return res.status(403).json({ message: "upload an image" });
    }
    try {
        const url = yield (0, cloudinary_1.default)(image.buffer);
        const inputData = Object.assign(Object.assign({}, bookInput), { cover_img: url });
        const book = yield (0, book_service_1.create_book)(inputData);
        return res.status(200).json({
            message: "Request was successful"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.createBook = createBook;
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, book_service_1.get_all_book)();
    return res.status(200).json({
        message: "Request was successful",
        data: books
    });
});
exports.getAllBook = getAllBook;
const getOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    const validId = (0, mongoose_1.isValidObjectId)(Id);
    if (!validId) {
        return res.status(400).json({ message: "Request Invalid" });
    }
    const book = yield (0, book_service_1.get_one_book)(Id);
    if (!book) {
        return res.status(404).json({ message: "Request does not exist" });
    }
    return res.status(200).json({ message: "Request was successful", data: book });
});
exports.getOneBook = getOneBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageFiles = req.file;
    const { Id } = req.params;
    const bookInput = __rest(req.body, []);
    const validId = (0, mongoose_1.isValidObjectId)(Id);
    if (!validId) {
        return res.status(400).json({ message: "Request Invalid" });
    }
    const book = yield (0, book_service_1.get_one_book)(Id);
    if (!book) {
        return res.status(404).json({ message: "Request does not exist" });
    }
    const cover_img = imageFiles ? yield (0, cloudinary_1.default)(imageFiles) : book === null || book === void 0 ? void 0 : book.cover_img;
    try {
        const inputData = Object.assign(Object.assign({}, bookInput), { cover_img: cover_img });
        const bookUpdate = yield (0, book_service_1.update_book)(Id, inputData);
        return res.status(200).json({ message: "Request successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    const validId = (0, mongoose_1.isValidObjectId)(Id);
    if (!validId) {
        return res.status(400).json({ message: "Request Invalid" });
    }
    const book = yield (0, book_service_1.get_one_book)(Id);
    if (!book) {
        return res.status(404).json({ message: "Request does not exist" });
    }
    try {
        const del = yield (0, book_service_1.delete_book)(Id);
        return res.status(200).json({ message: "Request was successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteBook = deleteBook;
