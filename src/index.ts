import 'dotenv/config'
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import helmet from 'helmet';
import cors from "cors";
import cookieParser from 'cookie-parser';
import * as path from "path";

const app = express()

const PORT = 3000;

declare global {
    namespace Express {
      interface Request{
        user?: {
          id: string,
          email: string,
          role: RoleType
        }
      }
    }
  }

try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL as string);
    console.log('ok')
} catch (error) {
    console.log(error);
    throw new Error("Databased refuse to connect")
}


app.set('view engine', 'hbs');

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // change it when you will have a
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet());

// import routes
import {UserRouter} from "./routes/user.routes";
import {authRouter} from "./routes/auth.routes";
import {bookRouter} from "./routes/book.routes"
import { RoleType } from './model/user.model';

// use routes
app.use("/api/user", UserRouter);
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);



app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`)
})