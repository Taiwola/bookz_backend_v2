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
exports.query_book = exports.delete_book = exports.update_book = exports.get_one_book = exports.get_all_book = exports.create_book = void 0;
const book_model_1 = __importDefault(require("../model/book.model"));
const create_book = (bookInput) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.create(Object.assign({}, bookInput));
    return book;
});
exports.create_book = create_book;
const get_all_book = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.default.find();
    return books;
});
exports.get_all_book = get_all_book;
const get_one_book = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(id);
    return book;
});
exports.get_one_book = get_one_book;
const update_book = (id, updateBook) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, reviews, related_books } = updateBook, rest = __rest(updateBook, ["tags", "reviews", "related_books"]);
    // Check if reviews array exists and is not null
    const reviewsToAdd = Array.isArray(reviews) ? { $each: reviews } : [];
    // Check if related_books array exists and is not null
    const relatedBooksToAdd = Array.isArray(related_books) ? { $each: related_books } : [];
    ;
    const tagsTobeAdd = tags ? { $each: tags } : [];
    const book = yield book_model_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, rest), { $push: {
            tags: tagsTobeAdd,
            reviews: reviewsToAdd,
            related_books: relatedBooksToAdd
        } }), { new: true });
    return book;
});
exports.update_book = update_book;
const delete_book = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findByIdAndDelete(id);
    return book;
});
exports.delete_book = delete_book;
const query_book = (filters, pageSize, skip, sortOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    if (filters.author) {
        filter.author = {
            $all: Array.isArray(filters.author) ? filters.author : [filters.author]
        };
    }
    if (filters.rating) {
        const starRating = Array.isArray(filters.rating)
            ? filters.rating.map((star) => parseInt(star))
            : parseInt(filters.rating);
        filter.starRating = Array.isArray(starRating)
            ? { $in: starRating }
            : { $eq: starRating };
    }
    if (filters.title) {
        filter.title = filters.title;
    }
    if (filters.genre) {
        filter.genre = filters.genre;
    }
    if (filters.price) {
        filter.price = filters.price;
    }
    if (filters.tags && filters.tags.length > 0) {
        filter.tags = { $all: filters.tags };
    }
    if (filters.age_group) {
        filter.age_group = filters.age_group;
    }
    const books = yield book_model_1.default.find(filter).sort(sortOptions).skip(skip).limit(pageSize);
    return books;
});
exports.query_book = query_book;
