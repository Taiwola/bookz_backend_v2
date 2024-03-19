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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
try {
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(process.env.MONGODB_URL);
    console.log('ok');
}
catch (error) {
    console.log(error);
    throw new Error("Databased refuse to connect");
}
app.set('view engine', 'hbs');
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
// import routes
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
const book_routes_1 = require("./routes/book.routes");
// use routes
app.use("/api/user", user_routes_1.UserRouter);
app.use("/api/auth", auth_routes_1.authRouter);
app.use("/api/book", book_routes_1.bookRouter);
app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});
