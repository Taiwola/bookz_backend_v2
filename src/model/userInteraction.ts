import mongoose from "mongoose";

const userBookInteractionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    interactionType: { type: String, enum: ['bookmark', 'purchase'], required: true },
    date: { type: Date, default: Date.now }
});

const UserBookInteraction = mongoose.model('UserBookInteraction', userBookInteractionSchema);

export default UserBookInteraction;