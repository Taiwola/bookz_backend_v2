import { UserCreateInterface, UserUpdateInterface } from "../interfaces";
import { AuthInterface, AuthResponseInterface } from "../interfaces/auth.interface";
import { RoleType } from "../model/user.model";
import Joi from "joi";

export function validateUserCreateInput(input: UserCreateInterface): string | null {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email) {
        return "Email is required";
    } else if (!emailRegex.test(input.email.trim())) {
        return "Invalid email format";
    }

    // Validate password
    if (!input.password) {
        return "Password is required";
    } else if (input.password.length < 6 || input.password.length > 12) {
        return "Password must be between 6 and 12 characters long";
    }

    // Validate firstName
    if (typeof input.firstName !== 'string') {
        return "First name must be a string";
    } else if (!input.firstName) {
        return "First name is required";
    }

    // Validate lastName
    if (typeof input.lastName !== 'string') {
        return "Last name must be a string";
    } else if (!input.lastName) {
        return "Last name is required";
    }

    // Validate role
    // if (!(input.role in RoleType)) {
    //     return "Invalid role";
    // }

    // Validation passed
    return null;
}

export function validateUserUpdateInput(input: UserUpdateInterface): string | null {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.email && !emailRegex.test(input.email.trim())) {
        return "Invalid email format";
    }

    const enumValues = Object.values(RoleType);
    // Validate firstName
    if (input.firstName && !input.firstName.trim()) {
        return "First name is required";
    }

    if (typeof input.firstName !== 'string') {
        return "firstname must be string";
    };

    // Validate lastName
    if (input.lastName && !input.lastName.trim()) {
        return "Last name is required";
    }

    if (typeof input.lastName !== 'string') {
        return "Lastname must be string"
    };

    if (input.password && (input.password.length < 6 || input.password.length > 12)) {
        return "Password must be between 6 and 12 characters long";
    }

    // Validate role
    if (input.role) {
        const enumValues = Object.values(RoleType);
        if (!enumValues.includes(input.role as RoleType)) {
           return "Invalid role";
        }
    }

    // Validation passed
    return null;
}


export const validateUserInput = async (userInput: UserCreateInterface) => {

    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const Schema = Joi.object().keys({
        email: Joi.string().email().required().regex(emailRegex),
        firstName: Joi.string().required(),
        password: Joi.string().min(4).max(8).alphanum().required(),
        lastName: Joi.string().required()
    });

     await Schema.validateAsync({
        email: userInput.email,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        password: userInput.password
    })
    } catch (error) {
        return 'Validation error: ' + " " + (error as Error).message
    }

    
};

export const validateAuthInput = async (authInput: AuthInterface) => {
   
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const authSchema = Joi.object().keys({
            email: Joi.string().email().required().regex(emailRegex),
            password: Joi.string().required()
        });

        await authSchema.validateAsync(authInput);
    } catch (error) {
        return 'Validation error: ' + " " + (error as Error).message
    }
}


export const validateUpdateInput = async (updateInput: UserUpdateInterface) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const authSchema = Joi.object().keys({
            email: Joi.string().email().regex(emailRegex),
            password: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string()
        });

        await authSchema.validateAsync(updateInput);
    } catch (error) {
        return 'Validation error: ' + " " + (error as Error).message
    }
}