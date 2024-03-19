import { AvailabilityType } from "../model/book.model"

export interface BookInterface {
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
};


export interface filterOptions {
    author?: string,
    title?: string,
    rating?: string,
    genre?: string,
    price?: number,
    tags?: string[],
    age_group?: string,
}
export interface BookInterfaceUpdate {
    tags?: string[],
    title?: string,
    genre?: string,
    author?: string[],
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