import mongoose from "mongoose";

export enum AvailabilityType {
    Free = 'free',
    Paid = 'paid'
}

export type bookType = {
    _id: string
    cover_img: string,
    tags: string[],
    title: string,
    genre: string,
    author: string[],
    description?: string,
    language?: string,
    num_pages?: number,
    price?: number,
    rating?: number,
    reviews?: string[],
    related_books?: string[],
    availability?: AvailabilityType,
    age_group?: string,
    publication_date?: Date,
}


const bookSchema = new mongoose.Schema({
    cover_img: {type: String, required: true},
    tags: {type: [String], required: true},
    title: {type: String, required: true},
    genre: {type: String, required: true},
    author: [{type: String, required: true}],
    description: {type: String},
    rating: {type: Number, min: 1, max: 5},
    reviews: {type: [String]},
    related_books: {type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book'},
    age_group: {type: String},
    publication_date: {type: Date},
    language: {type: String},
    num_pages: {type: String},
    availability: {type: String, enum: Object.values(AvailabilityType), default: AvailabilityType.Free},
    price: {type: Number}
});


const Book = mongoose.model<bookType>("Book", bookSchema);

export default Book;