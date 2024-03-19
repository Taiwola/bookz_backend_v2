/**
* This user service module contains the main functions for handling user-related operations.
* These functions are used to create, update, delete, and retrieve users from the database.
*/

import { UserCreateInterface, UserUpdateInterface } from "../interfaces";
import User, { UserType } from "../model/user.model";


/**
* Creates a new user in the database with the provided user data.
*
* @param {UserCreateInterface} userData - An object containing the user data to be created.
* @returns {Promise<User>} - A promise that resolves to the newly created user object.
*/
export const create_user = async (userData: UserCreateInterface): Promise<UserType> => {
    const user = await User.create({
        ...userData
    });

    return user;
};

/**
* Updates an existing user in the database with the provided user data.
*
* @param {string} id - The unique ID of the user to be updated.
* @param {UserUpdateInterface} userUpdate - An object containing the user data to be updated.
* @returns {Promise<User>} - A promise that resolves to the updated user object.
*/
export const update_user = async(id: string, userUpdate: UserUpdateInterface) => {
    const user = await User.findOneAndUpdate({_id: id}, {
        ...userUpdate
    }, {new: true});

    return user;
};

/**
* Retrieves all users from the database.
*
* @returns {Promise<UserType[]>} - A promise that resolves to an array of user objects.
*/
export const get_all_user = async (): Promise<UserType[]> => {
    const user = await User.find();
    return user;
};

/**
* Retrieves a single user from the database with the provided ID.
*
* @param {string} id - The unique ID of the user to be retrieved.
* @returns {Promise<User | null>} - A promise that resolves to the user object or null if not found.
*/
export const get_one_user = async (id: string): Promise<UserType | null> => {
    const user = await User.findById(id);
    return user;
}

/**
* Retrieves a single user from the database with the provided email.
*
* @param {string} email - The email of the user to be retrieved.
* @returns {Promise<User | null>} - A promise that resolves to the user object or null if not found.
*/
export const get_one_user_email = async (email: string): Promise<UserType | null> => {
    const user = await User.findOne({
        email: email
        });
    
    return user;
}

/**
 * Deletes a user from the database with the provided ID.
 *
 * @param {string} id - The unique ID of the user to be deleted.
 * */
export const delete_user = async (id: string) => {
    const del_user = await User.deleteOne({
        _id : id
        });
    return del_user;
}