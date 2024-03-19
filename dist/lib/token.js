"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDollarSign = exports.verifyToken = exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const generateToken = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a payload containing email and id
    const payload = {
        id, email
    };
    // Sign the payload with the secret key and set expiration time to 1 day
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    // Return the generated token
    return token;
});
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        // Verify the token's authenticity using the secret key
        // If verification fails, return null
        if (!verify) {
            return null;
        }
        // Decode the token to extract the user ID
        const decode = jwt.decode(token);
        return decode;
    }
    catch (error) {
        // Handle any errors that might occur during token verification or decoding
        console.error('Error verifying token:', error);
        return null;
    }
});
exports.verifyToken = verifyToken;
function removeDollarSign(token) {
    if (token.startsWith('$')) {
        return token.substring(1);
    }
    return token;
}
exports.removeDollarSign = removeDollarSign;
