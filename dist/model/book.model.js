"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var AvailabilityType;
(function (AvailabilityType) {
    AvailabilityType["Free"] = "free";
    AvailabilityType["Paid"] = "paid";
})(AvailabilityType || (exports.AvailabilityType = AvailabilityType = {}));
const bookSchema = new mongoose_1.default.Schema({
    cover_img: { type: String, required: true },
    tags: { type: [String], required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: [{ type: String, required: true }],
    description: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    reviews: { type: [String] },
    related_books: { type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Book' },
    age_group: { type: String },
    publication_date: { type: Date },
    language: { type: String },
    num_pages: { type: String },
    availability: { type: String, enum: Object.values(AvailabilityType), default: AvailabilityType.Free },
    price: { type: Number }
});
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
