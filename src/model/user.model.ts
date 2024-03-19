import mongoose from "mongoose";


export enum RoleType  {
   admin = 'admin',
   editor = 'editor',
   reader = 'reader'
}

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: RoleType;
    confirm: boolean
}

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, require: true, enum: Object.values(RoleType), default: RoleType.reader},
    confirm: {type: Boolean, default: false}
});


const User = mongoose.model<UserType>("User", userSchema);

export default User;