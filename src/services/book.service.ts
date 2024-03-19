import { BookInterface, BookInterfaceUpdate, filterOptions } from "../interfaces/book.interface";
import Book from "../model/book.model";

export const create_book = async (bookInput: BookInterface) => {
    const book = await Book.create({
        ...bookInput
    });

    return book;
};

export const get_all_book = async () => {
    const books = await Book.find();
    return books;
};

export const get_one_book = async (id: string) => {
    const book = await Book.findById(id);
    return book;
};


export const update_book = async (id: string, updateBook: BookInterfaceUpdate) => {
    const { tags, reviews, related_books, ...rest } = updateBook;
    // Check if reviews array exists and is not null
    const reviewsToAdd = Array.isArray(reviews) ? {$each: reviews } : [];

    // Check if related_books array exists and is not null
    const relatedBooksToAdd = Array.isArray(related_books) ? {$each: related_books } : [];;
    const tagsTobeAdd = tags ? { $each: tags } : [];

    const book = await Book.findByIdAndUpdate(
        id, 
        { 
            ...rest, 
            $push: { 
                tags: tagsTobeAdd, 
                reviews: reviewsToAdd,
                related_books: relatedBooksToAdd
            }
        }, 
        { new: true }
    );


    return book;
}

export const delete_book = async (id: string) => {
    const book = await Book.findByIdAndDelete(id);
    return book;
}

export const query_book = async (filters: filterOptions, pageSize: number,skip: number, sortOptions: any) => {
 
    let filter: any = {};

    if (filters.author) {
        filter.author = {
            $all: Array.isArray(filters.author) ? filters.author : [filters.author]
        };
    }

    if (filters.rating) {
        const starRating = Array.isArray(filters.rating)
            ? filters.rating.map((star: string) => parseInt(star))
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
        filter.age_group = filters.age_group
    }

    const books = await Book.find(filter).sort(sortOptions).skip(skip).limit(pageSize);
    const total = await Book.countDocuments(filter);
        return {
            books, total
        };
    
}