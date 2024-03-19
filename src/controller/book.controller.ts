import {Request, Response} from "express";
import cloudUpload from "../lib/cloudinary"; 
import { BookInterface, BookInterfaceUpdate, filterOptions } from "../interfaces/book.interface";
import { create_book, delete_book, get_all_book, get_one_book, query_book, update_book } from "../services/book.service";
import {isValidObjectId} from "mongoose"


export const createBook = async (req:Request, res: Response) => {
   const image = req.file;
   const {...bookInput} = req.body as BookInterface;


   if (!image) {
    return res.status(403).json({message: "upload an image"})
   }


   try {
       const url = await cloudUpload(image.buffer);
       const inputData = {
        ...bookInput,
        cover_img: url as string
       };

       const book = await create_book(inputData);
       return res.status(200).json({
        message: "Request was successful"
       })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Internal server error"
    });
   }
}

export const getAllBook = async (req: Request, res: Response) => {
    const books = await get_all_book();

    return res.status(200).json({
        message: "Request was successful",
        data: books
    })
}

export const getOneBook = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const validId = isValidObjectId(Id);
    if (!validId) {
        return res.status(400).json({message: "Request Invalid"});
    }
    const book = await get_one_book(Id);

    if (!book) {
        return res.status(404).json({message: "Request does not exist"});
    }
    return  res.status(200).json({message: "Request was successful", data: book});
}

export const updateBook = async (req: Request, res: Response) => {
    const imageFiles = req.file as Express.Multer.File;
    const {Id} = req.params;
    const {...bookInput} = req.body as BookInterfaceUpdate;
    const validId = isValidObjectId(Id);
    if (!validId) {
        return res.status(400).json({message: "Request Invalid"});
    }

    const book = await get_one_book(Id);

    if (!book) {
        return res.status(404).json({message: "Request does not exist"});
    }

    const cover_img = imageFiles ? await cloudUpload(imageFiles) : book?.cover_img;

    

    try {
        const inputData = {
            ...bookInput,
            cover_img: cover_img as string
           };
        const bookUpdate = await update_book(Id, inputData)
        return res.status(200).json({message: "Request successful"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const validId = isValidObjectId(Id);
    if (!validId) {
        return res.status(400).json({message: "Request Invalid"});
    }

    const book = await get_one_book(Id);

    if (!book) {
        return res.status(404).json({message: "Request does not exist"});
    }

    
    try {
        const del = await delete_book(Id);
        return res.status(200).json({message: "Request was successful"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const filterBook = async (req: Request, res: Response) => {
    const {
        ...filter
    }: filterOptions = req.query;

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;

        let sortOptions = {};
        switch(req.query.sortOptions){
            case 'rating':
                sortOptions = {rating: -1}
                break;
            case 'priceAsc':
                sortOptions = {price: 1}
                break;
            case 'priceDesc':
                sortOptions = {price: -1}
                break;
        }

        
        try {
        const query = await query_book(filter, pageSize, skip, sortOptions);
        return res.status(200).json({
            message: "Request was sucessful",
            total: query.total,
            data: query.books
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
} 