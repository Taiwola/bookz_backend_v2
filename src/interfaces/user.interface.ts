import { RoleType } from "../model/user.model";

export interface UserCreateInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: RoleType
}


export interface UserUpdateInterface {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: RoleType;
    confirm?: boolean
}