import { RoleType } from "../model/user.model";

export interface AuthInterface {
    email: string;
    password: string;
}

export interface AuthResponseInterface {
    firstName: string,
    lastName: string,
    email: string,
    confirm: boolean,
    role: RoleType
}
