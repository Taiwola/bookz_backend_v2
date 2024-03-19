import {Request, Response} from "express";
import {delete_user, get_all_user, get_one_user, update_user} from "../services";
import {isValidObjectId} from "mongoose";
import {UserUpdateInterface} from "../interfaces"
import { validateUserCreateInput, validateUserUpdateInput } from "../validator/userInput.validate";


// Controller to update user
// Required: Id, UserUpdateInterface
// Returns: JSON object containing message and user object
export const updateUser = async (req: Request, res: Response) => {
    // Extract Id from request parameters
    const { Id } = req.params;
    // Extract user update details from request body
    const { ...userUpdate }: UserUpdateInterface = req.body;
    // Validate user update input
    const validationResult = validateUserUpdateInput(userUpdate);
    // Return error message in JSON format
    if (validationResult) {
        res.status(400).json({
            message: validationResult,
        })
    };
    // Validate the user Id
    const validate = isValidObjectId(Id);
    if (!validate) {
        // Return error message in JSON format
        return res.status(400).json({ message: "Invalid user ID!" });
    }

    try {
        // Update user with provided Id and user update details
        const user = await update_user(Id, userUpdate);
        if (!user) {
            // Return error message in JSON format
            return res.status(404).json({ message: 'User not found!' });
        }
        // Return success message and user object in JSON format
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller to get all users
// Returns: JSON object containing message and an array of user objects
export const getAllUser = async (req: Request , res:Response) => {
    const users = await get_all_user();
     // Return success message and users array in JSON format
    res.status(200).json({
        message: "Success",
        data: users
    });
};


// Controller to get a single user
// Required: Id
// Returns: JSON object containing message and user object
export const getOneUser = async (req: Request, res: Response) => {
    const {Id} = req.params;
     // Validate the user Id
    const validate = isValidObjectId(Id);
    if (!validate) {
        // Return error message in JSON format
        return res.status(400).
        json({message:"Invalid user ID!"});
    };

    const user = await get_one_user(Id);

    if (!user) {
        return res.status(404).
        json({message: 'No user found'});
    };

     // Return success message and user object in JSON format
    res.status(200).json({
        message: "Success",
        data: user
    })
};

// Middleware to delete a user
// Required: Id
// Returns: JSON object containing message
export const deleteUser = async (req: Request, res: Response) => {
    const {Id} = req.params;
     // Validate the user Id
    const validate = isValidObjectId(Id);
    if (!validate) {
        // Return error message in JSON format
        return res.status(400).
        json({message:"Invalid user ID!"});
    };

    const user = await delete_user(Id);
    if (user.deletedCount === 0) {
         // Return error message in JSON format
        return res.status(404).
        json({message:'User not found!'})
    }

    // Return success message in JSON format
    res.status(200).json({
        message: "Success"
    });
}