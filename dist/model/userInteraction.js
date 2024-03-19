"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userBookInteractionSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Book', required: true },
    interactionType: { type: String, enum: ['bookmark', 'purchase'], required: true },
    date: { type: Date, default: Date.now }
});
const UserBookInteraction = mongoose_1.default.model('UserBookInteraction', userBookInteractionSchema);
exports.default = UserBookInteraction;
