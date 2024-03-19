"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var RoleType;
(function (RoleType) {
    RoleType["admin"] = "admin";
    RoleType["editor"] = "editor";
    RoleType["reader"] = "reader";
})(RoleType || (exports.RoleType = RoleType = {}));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, require: true, enum: Object.values(RoleType), default: RoleType.reader },
    confirm: { type: Boolean, default: false }
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
