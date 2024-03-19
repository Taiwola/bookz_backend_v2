import {Request, Response} from "express";
import { UserCreateInterface } from "../interfaces";
import { validateAuthInput, validateUpdateInput, validateUserCreateInput, validateUserUpdateInput } from "../validator/userInput.validate";
import { create_user, get_one_user, get_one_user_email, update_user } from "../services";
import bcrypt from "bcryptjs";
import { RoleType } from "../model/user.model";
import { sendAdminRequest, sendConfirmationEmail, sendResetTokenMail } from "../lib/mailer";
import {generateToken, removeDollarSign, verifyToken} from "../lib/token";
import { AuthInterface, AuthResponseInterface } from "../interfaces/auth.interface";
import { string } from "joi";


export const createUser = async (req: Request, res: Response) => {
    const {...inputUser}: UserCreateInterface = req.body;
    const validateInput = validateUserCreateInput(inputUser);

    if (validateInput) {
        return res.status(400).json({
            message: validateInput
        })
    };

    const userExist = await get_one_user_email(inputUser.email);

    if (userExist) {
        return res.status(404).json({
            message: "Email already in use"
        })
    };

    const hashPwd = await bcrypt.hash(inputUser.password, 10);

    const inputData = {
        ...inputUser,
        password: hashPwd,
        role: RoleType.reader
    }

    try {
        const saveUser = await create_user(inputData);

        const token = await generateToken(saveUser._id, saveUser.email);


        const { error, errorMessage } = await sendConfirmationEmail({
            email: inputUser.email,
            username: inputUser.firstName + ' ' + inputUser.lastName,
            token: token
          });

          if (error) {
            console.log(errorMessage);
          }

          return res.status(201).json({
            message: "User created successfully",
            user: saveUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })      
    }
}

export const confirmEmail = async (req: Request, res: Response) => {
    const {confirmation_token} = req.query;
    const token = removeDollarSign(confirmation_token as string);
    const verify = await verifyToken(token as string);

    if (verify === null) {
        return res.status(403).json({
            message: "Invalid or expired session"
        });
    }

    const user = await get_one_user(verify.id as string);

    if (!user) {
        return res.status(403).json({
            message: "user does not exist"
        });
    };

    const confirmData = {
        confirm: true
    }

    const confirmUser = await update_user(user._id, confirmData);

    return res.status(200).json({
        message: "Email confirmed successfully"
    });
}

export const login = async (req: Request, res: Response) => {
    try {
        const {...userInput}: AuthInterface = req.body;
        const validateInput = validateAuthInput(userInput);

        if (!validateInput) {
            return res.status(400).json({
                message: validateInput
            });
        };

        const user = await get_one_user_email(userInput.email as string);
        if (!user) {
            return res.status(401).json({message: "Invalid credentials"});
        };


        const isMatch = await bcrypt.compare(userInput.password, user.password);


        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        };
        // create token
        const token = await generateToken(user._id, user.email);
        const result: AuthResponseInterface = user;

        res.cookie('auth-token', token, {httpOnly: true, sameSite: "none" ,secure: process.env.NODE_ENV === 'production', maxAge: 86400000});
        return res.status(200).json({
            data: result,
            accessToken: token
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    const {email} = req.body;

    const user = await get_one_user_email(email);

    if (!user) {
        return res.status(404).json({message: "user not found"});
    };

    const token = await generateToken(user._id, user.email);
    const username = user.firstName + ' ' + user.lastName

   try {
    const {error, errorMessage} = await sendResetTokenMail(user.email, username,  token);

    if (error) {
        console.log(errorMessage);
      }

      return res.status(200).json({
        message: "Check your email to reset your password"
      })

   } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: 'Internal server error'
    }) 
   }
}

export const resetPassword = async (req: Request, res: Response) => {
  
   try {
    const {reset_token} = req.query;
    let {password} = req.body;

    const validateInput = await validateUpdateInput({password});

    if (validateInput) {
        return res.status(400).json({
            message: validateInput
        })
    };

    const token = removeDollarSign(reset_token as string)
    const validateToken = await verifyToken(token);

    const user = await get_one_user(validateToken?.id as string);

    if (!user) {
        return res.status(404).json({message: "User not found"})
    };

    const hashpwd = await bcrypt.hash(password, 10);
    password = hashpwd

    const updatePassword = await update_user(user._id, password);

    return res.status(200).json({message: "Request successful"});
   } catch (error) {
    console.log('Error resetting password:', error);
    return res.status(500).json({message: "Internal server error"})
   }
   
}

export const requestAdminRole = async (req: Request, res: Response) => {
    const {email} = req.body;

    const userExist = await get_one_user_email(email);

    if (!userExist) {
        return res.status(404).json({message: "user not found"});
    };

    const token = await generateToken(userExist._id, userExist.email);
    const username = userExist.firstName + ' ' + userExist.lastName;

    try {
        const {error, errorMessage} = await sendAdminRequest({
            email: userExist.email, 
            username: username, 
            token: token.toString()});

            if (error) {
                console.log(errorMessage);
              }
        
              return res.status(200).json({
                message: "Email sent"
              })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }

}


export const confirmAdmin = async (req: Request, res: Response) => {
    const {admin_request} = req.query;

    try {
        const token = removeDollarSign(admin_request as string);
        const validateToken = await verifyToken(token);

        const user = await get_one_user(validateToken?.id as string);

        if (!user) {
            return res.status(404).json({message: "User not found"})
        };

        const userUpdate = await update_user(user._id, {role: RoleType.admin});

        return res.status(200).json({message: "Request was successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'})
    }
}
