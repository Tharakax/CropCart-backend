import express from 'express';
import bodyParser from 'body-parser';
import nodemon from 'nodemon';
import mongoose from 'mongoose';
import JWTauth from './middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routers/userRouter.js';
const app = express();

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("Database connected")
    }
).catch(
    ()=>{
        console.log("connection failed")
      
    }
)
app.use(bodyParser.json());
app.use(JWTauth)

app.use("/api/user", userRouter)

app.listen(3000,()=>{
    console.log("Server has started , running on port 3000");
})