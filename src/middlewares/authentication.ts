import Jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import {get_one_user} from "../services";
import { RoleType } from "../model/user.model";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader?.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        };

        const token = authHeader.split(' ')[1];


        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        try {
            const decode = Jwt.verify(token, process.env.JWT_SECRET as string) as Jwt.JwtPayload;

            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }

            const user = await get_one_user(decode.id as string);

            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
              }

              const userData = {
                id: user._id,
                email: user.email,
                role: user.role
              }

              req.user = userData;
              next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader?.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        };

        const token = authHeader.split(' ')[1];


        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        try {
            const decode = Jwt.verify(token, process.env.JWT_SECRET as string) as Jwt.JwtPayload;

            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }

            const user = await get_one_user(decode.id as string);

            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
              }

              if (RoleType.admin === user.role) {
                next();
              } else {
                return res.status(400).json({success: false, message: "Not authorized"})
              }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const editorAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader?.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        };

        const token = authHeader.split(' ')[1];


        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        try {
            const decode = Jwt.verify(token, process.env.JWT_SECRET as string) as Jwt.JwtPayload;

            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }

            const user = await get_one_user(decode.id as string);

            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
              }

              if (RoleType.editor === user.role) {
                next();
              } else {
                return res.status(400).json({success: false, message: "Not authorized"})
              }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const editorOrAdmin = async (req: Request, res:Response, next:NextFunction) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader?.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: 'Not authorized, no token' });
        };

        const token = authHeader.split(' ')[1];


        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        try {
            const decode = Jwt.verify(token, process.env.JWT_SECRET as string) as Jwt.JwtPayload;

            if (!decode) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }

            const user = await get_one_user(decode.id as string);

            if (!user) {
                return res.status(401).json({ success: false, message: 'Token not authorized' });
              }

                  // Check if the user is an editor or an admin
    if (req.user && (req.user.role === RoleType.editor || req.user.role === RoleType.admin)) {
        return next(); // If yes, continue to the next middleware/route handler
    } else {
        // If not, return a 403 Forbidden error
        return res.status(403).json({ message: 'Forbidden' });
    }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
};